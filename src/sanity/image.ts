import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId: projectId || "unset", dataset });

export const urlFor = (source: SanityImageSource) => builder.image(source).auto("format").fit("max");
