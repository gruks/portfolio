"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  interval?: number; // milliseconds
  title?: string;
};

export default function TitleToggler({ interval = 60000, title = "Ayush Kumar"}: Props) {
  const originalRef = useRef<string>("");
  const visibleRef = useRef<boolean>(true);

  useEffect(() => {
    originalRef.current = "Hey!!!";
    // Start by showing the custom title immediately
    document.title = title;
    visibleRef.current = false;

    const id = setInterval(() => {
      document.title = visibleRef.current ? title : originalRef.current;
      visibleRef.current = !visibleRef.current;
    }, interval);

    return () => {
      clearInterval(id);
      document.title = originalRef.current;
    };
  }, [interval, title]);

  return null;
}
