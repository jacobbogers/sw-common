import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

import PreRendering from './db/pre-rendering';
import SSGSSR from './db/ssg-ssr';
import { content } from '../tailwind.config';
 
function db() {
  return {
    'pre-rendering': PreRendering,
    'ssg-ssr': SSGSSR,
  };
}

export async function getPostData(id) {
  const markdownContent = db()[id];
    
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(markdownContent);
 
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  console.log(processedContent)  
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml: contentHtml,
    ...matterResult.data,
  };
}

export function getSortedPostsData() {
  
  const allPostsData = Object.entries(db()).map(([id, data]) => {
  const matterResult = matter(data);
   // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const renderIds = Array.from(Object.keys(db()));
 
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return renderIds.map((id) => {
    return {
      params: {
        id,
      },
    };
  });
}