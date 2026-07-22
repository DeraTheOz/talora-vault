"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useBookmarkStore } from "@/stores/bookmark/bookmark-store";
import {
  deleteReview,
  getReview,
  saveReview,
} from "@/features/reviews/actions/review-actions";
import {
  ReviewFormInput,
  reviewFormSchema,
  ReviewFormValues,
} from "@/features/reviews/schemas/review-form-schema";
import { MediaType } from "@/features/media/types/media";
import type { Review } from "@/app/components/forms/review-form";

export function useReview(tmdbId: number, mediaType: MediaType) {
  const isSignedIn = useBookmarkStore((state) => state.isSignedIn);

  const [review, setReview] = useState<Review | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const form = useForm<ReviewFormValues, ReviewFormInput>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { rating: "", content: "" },
  });

  const { reset, setValue, handleSubmit } = form;

  // Load existing review
  useEffect(() => {
    if (!isSignedIn) return;

    getReview(tmdbId, mediaType)
      .then((existingReview) => {
        if (existingReview) {
          setReview(existingReview as Review);
          reset({
            rating: existingReview.rating,
            content: existingReview.content || "",
          });
          setIsLocked(true);
        }
      })
      .catch((error) => {
        console.error("Failed to load review", error);
        toast.error("Failed to load review");
      });
  }, [isSignedIn, tmdbId, mediaType, reset]);

  /** Create or edit existing review */
  async function onSubmit(data: ReviewFormInput) {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }

    const result = await saveReview({
      tmdbId,
      mediaType,
      rating: data.rating,
      content: data.content || null,
    });

    if (result.error) {
      if (result.authRequired) {
        setShowAuthModal(true);
      } else {
        toast.error(result.error);
      }
    } else if (result.success && result.review) {
      setReview(result.review as Review);
      reset({
        rating: result.review.rating,
        content: result.review.content || "",
      });
      setIsLocked(true);
      toast.success("Review uploaded successfully");
    }
  }

  // Intercept submit for unauthenticated users
  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!isSignedIn) {
      event.preventDefault();
      setShowAuthModal(true);
      return;
    }
    handleSubmit(onSubmit as SubmitHandler<ReviewFormValues>)(event);
  }

  /** Unlock form to edit reviews */
  function handleEdit() {
    if (review) {
      setValue("rating", review.rating);
      setValue("content", review.content || "");
    }
    setIsLocked(false);

    // Smoothly scroll down to the form
    requestAnimationFrame(() => {
      document.getElementById("review-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  /** Cancel review edit and lock review form */
  function handleCancel() {
    if (review) {
      reset({
        rating: review.rating,
        content: review.content || "",
      });
    }
    setIsLocked(true);
  }

  /** Perform deletion on user confirmation */
  async function handleConfirmDelete() {
    setIsDeleting(true);

    try {
      const result = await deleteReview(tmdbId, mediaType);

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        setReview(null);
        reset({ rating: "", content: "" });
        setIsLocked(false);
        setShowDeleteModal(false);
        toast.success("Review deleted successfully");
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return {
    form,
    review,
    isLocked,
    showAuthModal,
    setShowAuthModal,
    showDeleteModal,
    setShowDeleteModal,
    handleFormSubmit,
    handleEdit,
    handleCancel,
    openDeleteModal: () => setShowDeleteModal(true),
    isDeleting,
    handleConfirmDelete,
  };
}
