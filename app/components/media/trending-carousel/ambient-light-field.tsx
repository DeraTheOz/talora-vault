"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { MotionValue } from "framer-motion";

interface AmbientLightFieldProps {
  auroraDelay: MotionValue<string>;
  auroraLift: MotionValue<string>;
  activeBackdrop: string | null;
}

export default function AmbientLightField({
  auroraDelay,
  auroraLift,
  activeBackdrop,
}: AmbientLightFieldProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        className="absolute left-1/2 top-1/2 h-80 w-2xl -translate-x-1/2 rounded-full bg-talora-red/15 blur-[7rem]"
        style={{ top: auroraLift, left: auroraDelay }}
      />
      <motion.div
        className="absolute left-0 right-1/2 top-10 h-72 w-136 rounded-full bg-talora-greyish-blue/25 blur-[8rem]"
        style={{ left: auroraDelay }}
      />
      <AnimatePresence initial={false}>
        {activeBackdrop ? (
          <motion.div
            key={activeBackdrop}
            initial={{ opacity: 0, scale: 1.06, filter: "blur(3rem)" }}
            animate={{ opacity: 0.14, scale: 1, filter: "blur(3.5rem)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-x-0 top-1/2 h-[70%] -translate-y-1/2">
            <Image
              src={activeBackdrop}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
