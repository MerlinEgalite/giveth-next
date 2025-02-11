import React from 'react'
import * as matter from 'gray-matter'
import { client } from '../src/apollo/client'
import { useState } from 'react'
import GivethContent from '../src/content/giveth.md'
import Layout from '../src/components/layout'
import Seo from '../src/components/seo'
import Hero from '../src/components/home/HeroSection'
import InfoSection from '../src/components/home/InfoSection'
import UpdatesSection from '../src/components/home/UpdatesSection'
import HomeTopProjects from '../src/components/home/HomeTopProjects'
import { PopupContext } from '../src/contextProvider/popupProvider'

import { FETCH_ALL_PROJECTS } from '../src/apollo/gql/projects'

const IndexContent = ({
  hideInfo,
  content,
  topProjects,
  categories,
  allProject,
  mediumPosts,
}) => {
  const popup = React.useContext(PopupContext)
  // const [afterRenderProjects, setAfterRenderProjects] = useState(null)
  const [popupShown, setPopupShown] = useState(false)
  // useEffect(() => {
  //   if (location?.state?.welcome && !popupShown) {
  //     const extra = location?.state?.flashMessage || false
  //     popup.triggerPopup('WelcomeLoggedOut', extra)
  //     setPopupShown(true)
  //   }
  // }, [])
  return (
    <>
      <Hero content={content} />
      <HomeTopProjects
        fromHomePage
        projects={topProjects}
        categories={categories}
        totalCount={allProject?.totalCount}
      />
      {!hideInfo === true ? <InfoSection content={content} /> : null}
      <UpdatesSection mediumPosts={mediumPosts} />
    </>
  )
}

const IndexPage = (props) => {
  const { data, content, mediumPosts, topProjects } = props
  // const { markdownRemark, topProjects, allProject } = data;
  const hideInfo = process.env.HIDE_INFO_SECTION
    ? process.env.HIDE_INFO_SECTION
    : false

  return (
    <Layout isHomePage="true">
      <Seo title="Home" />
      <IndexContent
        hideInfo={hideInfo}
        content={content}
        mediumPosts={mediumPosts}
        // html={null}
        // location={location}
        topProjects={topProjects}
        categories={topProjects?.categories}
        allProject={null}
      />
    </Layout>
  )
}

export async function getServerSideProps() {
  const { loading, error = null, data: response } = await client.query({
    query: FETCH_ALL_PROJECTS,
    variables: { limit: 3 },
  })

  const mdContent = matter(GivethContent)

  const medium = await fetch(
    'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/giveth'
  )
  const mediumPosts = await medium.json()

  return {
    props: {
      topProjects: response?.projects,
      content: mdContent?.data,
      mediumPosts: mediumPosts?.items?.slice(0, 2) || {},
    },
  }
}

export default IndexPage
