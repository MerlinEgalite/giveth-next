import React, { useState, useContext } from 'react'
import { Heading, Box, Button, Card, IconButton, Text } from 'theme-ui'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'
import { useApolloClient } from '@apollo/react-hooks'
import theme from '../gatsby-plugin-theme-ui/index'
// import Donate from '../components/donateForm'
import { TOGGLE_PROJECT_REACTION } from '../apollo/gql/projects'
import iconShare from '../images/icon-share.svg'
import iconHeart from '../images/icon-heart.svg'
import { TorusContext } from '../contextProvider/torusProvider'

const CardContainer = styled(Card)`
  position: relative;
  z-index: 0;
  background-color: ${theme.colors.background};
  margin-bottom: 30px;
  border-radius: 12px;
  width: 100%;
`

const CardContent = styled.span`
  display: flex;
  flex: 1;
  word-wrap: break-word;
  padding: 1rem;
`

const AltCardContent = styled.span`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 0.5rem 1.5rem 1rem 1.5rem;
`

const Badge = styled.span`
  padding: 3px 11.76px;
  margin: 1rem 0.2rem;
  align-items: center;
  border: 1px solid ${theme.colors.bodyLight};
  border-radius: 48px;
  color: ${theme.colors.bodyLight};
`

const Dot = styled.span`
  height: 68px;
  width: 68px;
  display: grid;
  color: ${theme.colors.background};
  border: 6px solid ${theme.colors.background};
  border-radius: 50%;
  position: absolute;
  bottom: -34px;
  left: 24px;
  font-family: 'Red Hat Text', sans-serif;
  font-size: 10px;
`

const DotInner = styled.span`
  display: block;
  text-align: center;
  align-self: center;
  position: relative;
`

const Options = styled.span`
  font-family: 'Red Hat Text', sans-serif;
  color: ${theme.colors.background};
  display: flex;
  position: absolute;
  align-items: center;
  bottom: -54px;
  right: 24px;
`

const CardFooter = styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 1rem 0;
  padding: 1rem;
`

const Givers = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  margin: 1.2rem 0 0.5rem 0;
  div:first-child {
    border-right: 2px solid #edf0fa;
  }
  div {
    padding: 0 1rem;
  }
`
const IconBtn = styled(IconButton)`
  cursor: pointer;
`

const Categories = categories => {
  if (!categories || !categories.isArray || categories?.length <= 0) return null
  return categories?.map((category, index) => (
    <Badge key={index}>
      <Text
        sx={{ variant: 'text.default' }}
        style={{
          fontSize: '10px',
          color: theme.colors.bodyLight,
          fontWeight: '500'
        }}
      >
        {category?.name?.toUpperCase()}
      </Text>
    </Badge>
  ))
}
const ProjectCard = props => {
  // const { balance } = useContext(TorusContext)
  const { project } = props
  const client = useApolloClient()
  const [altStyle, setAltStyle] = useState(false)

  const reactToProject = async () => {
    try {
      console.log({ project })
      const reaction = await client?.mutate({
        mutation: TOGGLE_PROJECT_REACTION,
        variables: {
          reaction: 'heart',
          projectId: parseFloat(project?.id)
        }
      })
      console.log({ reaction })
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <Box
      key={props.listingId + '_box'}
      style={{ width: '100%' }}
      onMouseOver={() => setAltStyle(true)}
      onMouseLeave={() => setAltStyle(false)}
    >
      <CardContainer key={props.listingId + '_card'}>
        <div
          key={props.listingId + '_div'}
          src={props.image}
          style={{
            width: '100%',
            height: '186px',
            margin: '0 auto',
            borderRadius: '12px 12px 0px 0px',
            backgroundImage: /^\d+$/.test(props.image)
              ? `url('/assets/create/projectImageGallery${props.image.toString()}.svg')`
              : `url(${props.image})`,
            boxShadow: altStyle
              ? 'inset 0 0 0 100vmax rgba(48, 59, 114, 0.6)'
              : null,
            backgroundColor: altStyle ? 'red' : '#cccccc',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
          }}
          alt={props.name}
        >
          <Dot
            key={props.listingId + '_card'}
            style={{
              backgroundColor:
                props.raised === 0
                  ? theme.colors.attention
                  : theme.colors.secondary
            }}
          >
            {props.raised === 0 ? (
              <DotInner>
                <Text
                  sx={{ variant: 'text.overlineSmall', color: 'background' }}
                >
                  NEW
                </Text>
              </DotInner>
            ) : (
              <DotInner>
                <Text
                  sx={{ variant: 'text.overlineSmall', color: 'background' }}
                >
                  RAISED
                </Text>
                <Text sx={{ variant: 'text.microbold', color: 'background' }}>
                  ${props.raised}
                </Text>
              </DotInner>
            )}
          </Dot>
          <Options>
            <IconBtn onClick={() => reactToProject()}>
              <img src={iconHeart} alt='' />
            </IconBtn>
            {/* <IconBtn>
              <img src={iconShare} alt='' />
            </IconBtn> */}
          </Options>
        </div>
        <Heading
          sx={{ variant: 'headings.h6' }}
          style={{
            padding: '2.5rem 1rem 0 1rem',
            width: '260',
            height: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: theme.colors.secondary
          }}
          key={props.listingId + '_heading'}
        >
          {props.name}
          <Text
            sx={{ variant: 'text.default' }}
            style={{
              color: theme.colors.primary,
              alignSelf: 'center',
              minHeight: '28px',
              lineHeight: '150%',
              paddingTop: '4px'
            }}
          >
            {''}
          </Text>
        </Heading>
        {altStyle && (
          <AltCardContent>
            <Givers>
              {/* <Text sx={{ variant: 'text.default' }}>GIVERS: 24</Text>
              <Text sx={{ variant: 'text.default' }}>DONATIONS: 65</Text> */}
            </Givers>
            <Button
              sx={{ variant: 'buttons.default', mt: 2 }}
              onClick={() => {
                !props.disabled &&
                  (window.location.href = `/project/${props?.slug || ''}`)
              }}
            >
              Learn More
            </Button>
            <Text
              sx={{
                variant: 'text.default',
                my: 2,
                mx: 'auto',
                cursor: 'pointer',
                color: theme.colors.primary
              }}
              onClick={() => {
                !props.disabled && navigate(`/donate/${props?.slug}`)
              }}
            >
              Donate
            </Text>
          </AltCardContent>
        )}
        <CardContent>
          <Text
            sx={{ variant: 'text.default' }}
            style={{
              fontSize: '16px',
              color: theme.colors.bodyDark,
              // textOverflow: 'ellipsis',
              // wordWrap: 'break-word',
              // whiteSpace: 'nowrap',
              overflow: 'hidden',
              height: '5rem',
              lineHeight: '1.2rem',
              display: '-webkit-box',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical'
            }}
          >
            {
              /* Description String */

              project?.description
            }
          </Text>
        </CardContent>
        <CardFooter>
          <Categories categories={project?.categories} />
        </CardFooter>
      </CardContainer>
      {
        // <Donate
        //   maxAmount={balance}
        //   doDonate={values => alert('donating' + values.amount)}
        // />
      }
    </Box>
  )
}

export default ProjectCard
