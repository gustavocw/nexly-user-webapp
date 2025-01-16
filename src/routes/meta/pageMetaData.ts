import React, { useEffect } from "react";

interface PageMetadataProps {
  title: string;
  faviconUrl: string;
}

const PageMetadata: React.FC<PageMetadataProps> = ({ title, faviconUrl }) => {
  useEffect(() => {
    document.title = title;
    const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (favicon) {
      favicon.href = faviconUrl;
    } else {
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.href = faviconUrl;
      document.head.appendChild(newFavicon);
    }
  }, [title, faviconUrl]);

  return null;
};

export default PageMetadata;
