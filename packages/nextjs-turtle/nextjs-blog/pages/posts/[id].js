import React from 'react';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts'; 
import Head from 'next/head';
import Date from '../../components/Date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
         return (
         <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>);
}

export function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    }
}


export async function getStaticProps({ params }){
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        }
    }
}
