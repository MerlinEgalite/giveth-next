import Link from 'next/link'
import NextImage from 'next/image'
import { useMediaQuery } from 'react-responsive'
import { Grid, Box, Flex, Image, Button, Text, jsx } from 'theme-ui'
import theme from '../../utils/theme-ui'
import styled from '@emotion/styled'

const Main = styled(Grid)`
  position: relative;
  .intextlink {
    color: ${theme.colors.background};
    font-weight: 700;
    text-decoration: none;

    & :hover {
      color: ${theme.colors.primary};
    }
  }
  .semitransparent {
    opacity: 0.2;
  }
`

const Decorator = styled.div`
  position: absolute;
`

const InfoSection = ({ content }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  return (
    <Main
      gap={2}
      rows={5}
      sx={{
        color: 'background',
        backgroundColor: 'secondary',
        alignItems: 'center',
        px: ['2rem', '8.75rem', '8.75rem'],
        pb: ['5rem', 0, 0],
        mb: ['2rem', 0, 0]
      }}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          justifySelf: 'center',
          textAlign: 'center',
          pt: '100px',
          px: [0, '14rem', '14rem'],
          color: 'background'
        }}
      >
        <Text pb={3} sx={{ variant: 'headings.h2', color: 'background' }}>
          {content?.infoHead}
        </Text>
        <Text
          pb={5}
          sx={{
            variant: 'text.large',
            color: 'background'
          }}
        >
          {content?.infoSubtitle}
        </Text>
        <a
          href='https://medium.com/giveth/the-future-of-giving-is-crowdfunding-the-commons-ac265e3010b8'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button
            sx={{
              variant: 'buttons.nofillGray',
              color: 'bodyLight',
              fontSize: 14,
              background: 'unset',
              px: '3rem',
              py: '0.875rem',
              mb: '6rem',
              borderSize: '2px',
              borderStyle: 'solid',
              borderColor: 'colors.bodyLight'
            }}
          >
            {content?.infoButtonText}
          </Button>
        </a>
      </Flex>
      <Grid
        columns={[1, 3, 3]}
        sx={{ justifyItems: 'center', textAlign: 'center' }}
      >
        <Flex sx={{ maxWidth: '320px', flexDirection: 'column' }}>
          <NextImage
            src='/images/svg/general/decorators/b.svg'
            width='100%'
            height='100%'
          />
          <Text
            sx={{
              variant: 'headings.h4',
              color: 'background',
              py: '1.5rem'
            }}
          >
            {content?.feature2}
          </Text>
          <Text sx={{ variant: 'text.paragraph', color: 'background' }}>
            {content?.feature2Text}
          </Text>
        </Flex>
        <Flex sx={{ maxWidth: '320px', flexDirection: 'column' }}>
          <NextImage
            src='/images/svg/general/decorators/a.svg'
            width='100%'
            height='100%'
          />
          <Text
            sx={{
              variant: 'headings.h4',
              color: 'background',
              py: '1.5rem'
            }}
          >
            {content?.feature1}
          </Text>
          <Text
            sx={{
              variant: 'text.paragraph',
              color: 'background'
            }}
          >
            {content?.feature1Text}
          </Text>
        </Flex>
        <Flex sx={{ maxWidth: '320px', flexDirection: 'column' }}>
          <NextImage
            src='/images/svg/general/decorators/c.svg'
            width='100%'
            height='100%'
          />
          <Text
            sx={{
              variant: 'headings.h4',
              color: 'background',
              py: '1.5rem'
            }}
          >
            {content?.feature3}
          </Text>
          <Text sx={{ variant: 'text.paragraph', color: 'background' }}>
            {content?.feature3Text}
          </Text>
        </Flex>
      </Grid>
      <Flex
        pt={4}
        pb={6}
        sx={{
          flexDirection: 'column',
          justifySelf: 'center',
          textAlign: 'center'
        }}
      >
        <a
          href='https://giveth.io/join'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button
            sx={{
              variant: 'buttons.default',
              fontSize: '2',
              letterSpacing: 'more'
            }}
          >
            {content?.featureCta}
          </Button>
        </a>
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
          justifySelf: 'center',
          textAlign: 'center'
        }}
      >
        <Text pb={3} sx={{ variant: 'headings.h2', color: 'background' }}>
          {content?.infoHead2}
        </Text>
        <Text
          pb={5}
          sx={{ variant: 'text.large', maxWidth: '580px', color: 'background' }}
        >
          {content?.infoSubtitle2}
        </Text>
      </Flex>
      <Grid gap={1} columns={[1, 3, 3]} sx={{ justifyItems: 'center' }}>
        <Grid
          p={2}
          rows={3}
          sx={{
            justifySelf: ['center', 'end', 'end'],
            alignContent: 'start',
            textAlign: 'center',
            maxWidth: '360px',
            maxHeight: '400px'
          }}
        >
          <Text sx={{ variant: 'headings.h4', color: 'background' }}>
            {content?.userType1Title}
          </Text>
          <Text pb={3} sx={{ variant: 'text.paragraph', color: 'background' }}>
            Create a project and get donations in crypto.{' '}
            <Link href='/create' className='intextlink'>
              Create your project
            </Link>{' '}
            and start raising funds.
          </Text>
          <Link href='/create'>
            <Button
              sx={{ variant: 'buttons.default', fontSize: 2, mt: '1.5rem' }}
            >
              Create a project
            </Button>
          </Link>
        </Grid>
        <Box sx={{ position: 'relative', bottom: '-12px' }}>
          {isMobile ? (
            <div sx={{ height: '20px' }} />
          ) : (
            <Image src={'/images/people-puzzle.svg'} alt='' />
          )}
        </Box>
        <Grid
          p={2}
          rows={3}
          sx={{
            justifySelf: ['center', 'start', 'start'],
            alignContent: 'start',
            textAlign: 'center',
            maxWidth: '360px'
          }}
        >
          <Text sx={{ variant: 'headings.h4', color: 'background' }}>
            For Givers
          </Text>
          <Text sx={{ variant: 'text.paragraph', color: 'background' }}>
            Use our platform to give donations to a cause or a project. Easily
            donate to the{' '}
            <Link href='/projects' className='intextlink'>
              project
            </Link>{' '}
            you most care about.
          </Text>
          <Link href='/projects'>
            <Button
              sx={{ variant: 'buttons.default', fontSize: 2, mt: '1.5rem' }}
            >
              Donate to a project
            </Button>
          </Link>
        </Grid>
      </Grid>
      {!isMobile ? (
        <Decorator>
          <img
            src={'/images/decorator-cloud1.svg'}
            alt=''
            sx={{
              position: 'absolute',
              top: '150px',
              left: '70px'
            }}
            className='semitransparent'
          />
          <img
            src={'/images/decorator-cloud2.svg'}
            alt=''
            sx={{
              position: 'absolute',
              top: '60px',
              left: '260px'
            }}
            className='semitransparent'
          />
          <img
            src={'/images/decorator-cloud2.svg'}
            alt=''
            sx={{
              position: 'absolute',
              top: '130px',
              right: '40px'
            }}
            className='semitransparent'
          />
          <img
            src={'/images/decorator-fizzy-square-rotated.svg'}
            alt=''
            sx={{
              position: 'relative',
              top: '710px',
              right: '-90vw'
            }}
          />
        </Decorator>
      ) : null}
    </Main>
  )
}

export default InfoSection
