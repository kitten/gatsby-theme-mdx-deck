import React from 'react'
import { useTransition, animated } from 'react-spring'
import { Location, Router, globalHistory } from '@reach/router'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'theme-ui'
import { Helmet } from 'react-helmet'
import get from 'lodash.get'
import merge from 'lodash.merge'
import useKeyboard from '../hooks/use-keyboard'
import useStorage from '../hooks/use-storage'
import useDeck from '../hooks/use-deck'
import useScale from '../hooks/use-scale'
import Context from '../context'
import Wrapper from './wrapper'
import Slide from './slide'
import { modes } from '../constants'

import baseTheme from '../gatsby-plugin-theme-ui/index'

import Presenter from './presenter'
import Overview from './overview'
import Grid from './grid'

const Keyboard = () => {
  useKeyboard()
  return false
}

const Storage = () => {
  useStorage()
  return false
}

const getIndex = () => {
  const { pathname } = globalHistory.location
  const paths = pathname.split('/')
  const n = Number(paths[paths.length - 1])
  const index = isNaN(n) ? 0 : n
  return index
}

const GoogleFont = ({ theme }) => {
  if (!theme.googleFont) return false
  return (
    <Helmet>
      <link rel="stylesheet" href={theme.googleFont} />
    </Helmet>
  )
}

const mergeThemes = (...themes) =>
  themes.reduce(
    (acc, theme) =>
      typeof theme === 'function' ? theme(acc) : merge(acc, theme),
    {}
  )

const DefaultMode = ({ children }) => <React.Fragment children={children} />

const TransitionRouter = ({ location, children }) => {
  const { theme: { transition }, slug } = useDeck()

  const from = (transition ? transition.length === 2 ? transition[1] : transition[0] : null) || {};
  const enter = (transition ? transition.length === 2 ? transition[0] : transition[1] : null) || {};
  const leave = (transition ? transition.length === 2 ? transition[1] : transition[2] : null) || {};

  const transitions = useTransition(location, location => location.key, {
    from,
    enter,
    leave,
  })

  return transitions.map(({ item, key, props }) => (
    <animated.div key={key} style={props}>
      <Router basepath={slug} location={item} style={{ height: '100%' }}>
        {children}
      </Router>
    </animated.div>
  ));
};

const Deck = ({
  slides = [],
  pageContext: { title, slug },
  theme = {},
  themes = [],
  ...props
}) => {
  const outer = useDeck()
  const index = getIndex()

  const head = slides.head.children

  const { components, ...mergedTheme } = mergeThemes(
    { ...baseTheme,...theme },
    ...themes
  )

  const scale = useScale(
    mergedTheme.size.width,
    mergedTheme.size.height,
  )

  const context = {
    ...outer,
    ...scale,
    slug,
    length: slides.length,
    index,
    steps: get(outer, `metadata.${index}.steps`),
    notes: get(outer, `metadata.${index}.notes`),
    theme: mergedTheme,
  }

  let Mode = DefaultMode

  switch (context.mode) {
    case modes.presenter:
      Mode = Presenter
      break
    case modes.overview:
      Mode = Overview
      break
    case modes.grid:
      Mode = Grid
      break
    default:
      break
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        {head}
      </Helmet>
      <GoogleFont theme={mergedTheme} />
      <Context.Provider value={context}>
        <ThemeProvider components={components} theme={mergedTheme}>
          <Global
            styles={{
              body: {
                margin: 0,
                overflow: context.mode === modes.normal ? 'hidden' : null,
              },
            }}
          />
          <Keyboard />
          <Storage />
          <Wrapper>
            <Mode slides={slides}>
              <Location>
                {({ location }) => (
                  <TransitionRouter location={location}>
                    <Slide index={0} path="/" slide={slides[0]} />
                    {slides.map((slide, i) => (
                      <Slide key={i} index={i} path={i + '/*'} slide={slide} />
                    ))}
                  </TransitionRouter>
                )}
              </Location>
            </Mode>
          </Wrapper>
        </ThemeProvider>
      </Context.Provider>
    </>
  )
}

export default Deck
