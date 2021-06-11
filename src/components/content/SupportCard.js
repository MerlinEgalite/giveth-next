import React from 'react'
import { Heading, Grid, Button, Card, Text } from 'theme-ui'
import Link from 'next/link'
import styled from '@emotion/styled'

import theme from '../../utils/theme-ui/index'

const CardContainer = styled(Card)`
  background-color: ${theme.colors.backgroundGray};
  margin-bottom: 30px;
  border-radius: 12px;
  max-width: 550px;
  overflow: hidden;
  position: relative;
`

const CardContent = styled.span`
  display: flex;
  flex: 1;
  word-wrap: break-word;
  padding: 2rem 1rem;
  position: relative;
`
const Logo = styled.img`
  align-self: center;
  justify-self: center;
  margin: 2rem;
`

const SupportCard = ({ data }) => (
  <>
    {data?.map(support => {
      return (
        <CardContainer key={support.platformLogo.sys.id + '_card'}>
          <Grid columns={[2, '1fr auto']}>
            <div>
              <Heading
                sx={{ variant: 'headings.h6' }}
                style={{
                  padding: '2.5rem 1rem 0 1rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: theme.colors.secondary,
                  background: 'none',
                  position: 'relative'
                }}
                key={support.platformLogo.sys.id + '_heading'}
              >
                {support.platformTitle}
              </Heading>

              <CardContent>
                <Text
                  sx={{ variant: 'text.default' }}
                  style={{
                    fontSize: '16px',
                    color: theme.colors.bodyDark,
                    lineHeight: '1.2rem',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {
                    /* Description String */

                    support.descriptionText
                  }
                </Text>
              </CardContent>
              <Link href={support.onboardingLink}>
                <a
                  style={{
                    alignSelf: 'center',
                    minHeight: '28px',
                    lineHeight: '150%',
                    position: 'relative'
                  }}
                >
                  <Button
                    mt={2}
                    mb={'2rem'}
                    ml={'1rem'}
                    sx={{
                      variant: 'buttons.default'
                    }}
                  >
                    {support.platformTitle}
                  </Button>
                </a>
              </Link>
            </div>
            <Logo
              src={support.platformLogo.fields.file.url}
              alt={support.platformTitle + ' logo'}
              width='90px'
            />
          </Grid>
        </CardContainer>
      )
    })}
  </>
)

export default SupportCard