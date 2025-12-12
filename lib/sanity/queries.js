export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->name,
  "categories": categories[]->title
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  body,
  mainImage,
  publishedAt,
  "author": author->{name, image},
  "categories": categories[]->title
}`;

export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  description
}`;
