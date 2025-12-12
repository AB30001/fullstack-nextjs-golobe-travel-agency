import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/lib/sanity/client';
import { postsQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { Calendar, User, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Blog | NordExplore - Nordic Travel Stories & Tips',
  description: 'Discover travel stories, tips, and guides for exploring the Nordic countries. Get inspired for your next adventure in Norway, Iceland, Sweden, Finland, and Denmark.',
};

export const revalidate = 60;

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  let posts = [];
  
  try {
    posts = await client.fetch(postsQuery);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Nordic Travel Blog
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Discover travel stories, tips, and insider guides for exploring the
            magical Nordic countries.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              No Posts Yet
            </h2>
            <p className="text-gray-600">
              We&apos;re working on some exciting content. Check back soon!
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Admin? Add posts at{' '}
              <Link href="/studio" className="text-blue-600 hover:underline">
                /studio
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <Link href={`/blog/${post.slug?.current}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(600).height(375).url()}
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
                        <span className="text-4xl font-bold text-white/30">
                          NE
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {post.categories && post.categories.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {post.categories.slice(0, 2).map((category, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mb-4 line-clamp-2 text-gray-600">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        {post.author && (
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {post.author}
                          </span>
                        )}
                        {post.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(post.publishedAt)}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
