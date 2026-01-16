import { Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import React from "react";
import { Platform } from "react-native";

import type { LinkProps } from "expo-router";
type ExternalLinkProps = {
  href: LinkProps["href"];
  children: React.ReactNode;
  style?: any;
  rel?: string;
};

export function ExternalLink({ href, ...rest }: ExternalLinkProps) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== "web") {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          if (typeof href === "string") {
            await openBrowserAsync(href);
          }
        }
      }}
    >
      {rest.children}
    </Link>
  );
}
