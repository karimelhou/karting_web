import fs from 'node:fs/promises';
import path from 'node:path';

import Image from 'next/image';
import { compileMDX } from 'next-mdx-remote/rsc';
import { createElement } from 'react';

import { Link } from '@/lib/i18n/navigation';

const contentRoot = path.join(process.cwd(), 'content');

export type MDXFrontmatter = {
  title: string;
  excerpt?: string;
  cover?: string;
  schemaType?: string;
  faq?: Array<{ question: string; answer: string }>;
  [key: string]: unknown;
};

// Cast required because MDX anchors expect classic anchor props
// and next-intl Link accepts extended props.
const MDXLink = (props: any) => createElement(Link as any, props);

export async function loadMDXFile(slugPath: string) {
  const filePath = path.join(contentRoot, `${slugPath}.mdx`);
  const source = await fs.readFile(filePath, 'utf8');
  const { content, frontmatter } = await compileMDX<{ frontmatter: MDXFrontmatter }>({
    source,
    options: {
      parseFrontmatter: true,
    },
    components: {
      Image,
      a: MDXLink,
    },
  });

  return {
    content,
    frontmatter: frontmatter as unknown as MDXFrontmatter,
  };
}

export async function loadCollection(directory: string) {
  const dirPath = path.join(contentRoot, directory);
  const entries = await fs.readdir(dirPath);
  const items = await Promise.all(
    entries
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, '');
        const { content, frontmatter } = await loadMDXFile(`${directory}/${slug}`);
        return { slug, content, frontmatter };
      }),
  );

  return items.sort((a, b) => a.slug.localeCompare(b.slug));
}
