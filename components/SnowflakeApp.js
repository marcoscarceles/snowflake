// @flow

import TrackSelector from '../components/TrackSelector'
import NightingaleChart from '../components/NightingaleChart'
import KeyboardListener from '../components/KeyboardListener'
import Track from '../components/Track'
import Wordmark from '../components/Wordmark'
import LevelThermometer from '../components/LevelThermometer'
import { eligibleTitles, trackIds, milestones, milestoneToPoints } from '../constants'
import PointSummaries from '../components/PointSummaries'
import type { Milestone, MilestoneMap, TrackId } from '../constants'
import React from 'react'
import TitleSelector from '../components/TitleSelector'

type SnowflakeAppState = {
  milestoneByTrack: MilestoneMap,
  name: string,
  title: string,
  focusedTrackId: TrackId,
}

const hashToState = (hash: String): ?SnowflakeAppState => {
  if (!hash) return null
  const result = defaultState()
  const hashValues = hash.split('#')[1].split(',')
  if (!hashValues) return null
  trackIds.forEach((trackId, i) => {
    result.milestoneByTrack[trackId] = coerceMilestone(Number(hashValues[i]))
  })
  if (hashValues[trackIds.length]) result.name = decodeURI(hashValues[trackIds.length])
  if (hashValues[trackIds.length + 1]) result.title = decodeURI(hashValues[trackIds.length + 1])
  return result
}

const coerceMilestone = (value: number): Milestone => {
  // HACK I know this is goofy but i'm dealing with flow typing
  switch (value) {
    case 0: return 0
    case 1: return 1
    case 2: return 2
    case 3: return 3
    case 4: return 4
    case 5: return 5
    default: return 0
  }
}

const emptyState = (): SnowflakeAppState => {
  return {
    name: '',
    title: '',
    milestoneByTrack: {

      "TIME_MANAGEMENT": 0,
      "SELF_MANAGEMENT": 0,
      "PROJECT_MANAGEMENT": 0,
      "INITIATIVE": 0,

      "EFFECTIVE_COMMUNICATION": 0,
      "CONFLICT_RESOLUTION": 0,
      "FLEXIBILITY_/ DEALING WITH AMBIGUITY": 0,
      "CREATIVITY_THINKING": 0,

      "MOTIVATING_OTHERS": 0,
      "DEVELOPING_OTHERS": 0,
      "TEAMWORK": 0,
      "ACCOMPLISHMENT": 0,

      "ENGINEERING_WOW PRACTICES": 0,
      "SOFTWARE_FUNDAMENTALS": 0,
      "SOFTWARE_AT SCALE": 0,
      "QUALITY": 0,

      "MOBILE": 0,
      "WEB_CLIENT": 0,
      "SERVER": 0,
      "FOUNDATIONS": 0,
    },
    focusedTrackId: 'TIME_MANAGEMENT'
  }
}

const defaultState = (): SnowflakeAppState => {
  return {
    name: 'Cersei Lannister',
    title: 'Staff Engineer',
    milestoneByTrack: {

      "TIME_MANAGEMENT": 3,
      "SELF_MANAGEMENT": 0,
      "PROJECT_MANAGEMENT": 3,
      "INITIATIVE": 4,

      "EFFECTIVE_COMMUNICATION": 5,
      "CONFLICT_RESOLUTION": 1,
      "FLEXIBILITY_/ DEALING WITH AMBIGUITY": 0,
      "CREATIVITY_THINKING": 2,

      "MOTIVATING_OTHERS": 1,
      "DEVELOPING_OTHERS": 0,
      "TEAMWORK": 1,
      "ACCOMPLISHMENT": 3,

      "ENGINEERING_WOW PRACTICES": 3,
      "SOFTWARE_FUNDAMENTALS": 2,
      "SOFTWARE_AT SCALE": 5,
      "QUALITY": 1,

      "MOBILE": 1,
      "WEB_CLIENT": 2,
      "SERVER": 3,
      "FOUNDATIONS": 4,

    },
    focusedTrackId: 'TIME_MANAGEMENT'
  }
}

const stateToHash = (state: SnowflakeAppState) => {
  if (!state || !state.milestoneByTrack) return null
  const values = trackIds.map(trackId => state.milestoneByTrack[trackId]).concat(encodeURI(state.name), encodeURI(state.title))
  return values.join(',')
}

type Props = {}

class SnowflakeApp extends React.Component<Props, SnowflakeAppState> {
  constructor(props: Props) {
    super(props)
    this.state = emptyState()
  }

  componentDidUpdate() {
    const hash = stateToHash(this.state)
    if (hash) window.location.replace(`#${hash}`)
  }

  componentDidMount() {
    const state = hashToState(window.location.hash)
    if (state) {
      this.setState(state)
    } else {
      this.setState(defaultState())
    }
  }

  render() {
    return (
      <main>
        <style jsx global>{`
          body {
            font-family: Helvetica;
          }
          main {
            width: 960px;
            margin: 0 auto;
          }
          .name-input {
            border: none;
            display: block;
            border-bottom: 2px solid #fff;
            font-size: 30px;
            line-height: 40px;
            font-weight: bold;
            width: 380px;
            margin-bottom: 10px;
          }
          .name-input:hover, .name-input:focus {
            border-bottom: 2px solid #ccc;
            outline: 0;
          }
          a {
            color: #888;
            text-decoration: none;
          }
        `}</style>
        <div style={{ margin: '19px auto 0' }}>
          {/* <a href="https://medium.com/" target="_blank">
            <Wordmark />
          </a> */}
          <h1>Novum Engineering Career Framework</h1>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <form>
              <input
                type="text"
                className="name-input"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                placeholder="State your name"
              />
            </form>
            <h2>Please rate your level of competency on each of the areas below.</h2>
            <p>If you want more information about each of the competencies, visit our <a href="https://docs.google.com/spreadsheets/d/177yMyIl7Oxahb-iPu3nemjhTJ9sLl-t1svFjgoBaXaw/edit?usp=sharing">Competency Matrix in Google Sheets</a>.</p>
            <p>Since it’s impossible to accurately assess a level of competency based on a short sentence the following additional resources are provided:</p>
            <ul>
              <li>A company wide level impact expectation: All levels are somewhat equivalent among competencies. The impact of an individual performance on the company can be used to steer in doubt between two levels.</li>
              <li>A set of behaviours expected of someone having reached that level.</li>
              <li>A set of practices that could (but not necessarily does) demonstrate this level of  competency.</li>
            </ul>
            <p style={{ fontWeight: 'bold' }}>After completing your self-evaluation (including your full name above and scoring below), please submit the generated URL to <a href="https://docs.google.com/forms/d/e/1FAIpQLSe19Y43rLSX-5pMOgmxXSJ0TFkAePr-w5r79AQ4hdCcLg4vmg/viewform?usp=sf_link">this form</a>.</p>
          </div>
          <div style={{ flex: 0 }}>
            <NightingaleChart
              milestoneByTrack={this.state.milestoneByTrack}
              focusedTrackId={this.state.focusedTrackId}
              handleTrackMilestoneChangeFn={(track, milestone) => this.handleTrackMilestoneChange(track, milestone)} />
          </div>
        </div>
        <TrackSelector
          milestoneByTrack={this.state.milestoneByTrack}
          focusedTrackId={this.state.focusedTrackId}
          setFocusedTrackIdFn={this.setFocusedTrackId.bind(this)} />
        <KeyboardListener
          selectNextTrackFn={this.shiftFocusedTrack.bind(this, 1)}
          selectPrevTrackFn={this.shiftFocusedTrack.bind(this, -1)}
          increaseFocusedMilestoneFn={this.shiftFocusedTrackMilestoneByDelta.bind(this, 1)}
          decreaseFocusedMilestoneFn={this.shiftFocusedTrackMilestoneByDelta.bind(this, -1)} />
        <Track
          milestoneByTrack={this.state.milestoneByTrack}
          trackId={this.state.focusedTrackId}
          handleTrackMilestoneChangeFn={(track, milestone) => this.handleTrackMilestoneChange(track, milestone)} />
        <div style={{ display: 'flex', paddingBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            Made with ❤️ by Novum Eng, based on an original idea from <a href="https://medium.engineering" target="_blank">Medium Eng</a>.
            Learn about <a href="https://medium.com/s/engineering-growth-framework" target="_blank">their version of this growth framework</a>
            {' '}and <a href="https://medium.engineering/engineering-growth-at-medium-4935b3234d25" target="_blank">what they do currently</a>.
            Get the <a href="https://github.com/Medium/snowflake" target="_blank">source code</a>.
            Read the <a href="https://medium.com/p/85e078bc15b7" target="_blank">terms of service</a>.
          </div>
        </div>
      </main >
    )
  }

  handleTrackMilestoneChange(trackId: TrackId, milestone: Milestone) {
    const milestoneByTrack = this.state.milestoneByTrack
    milestoneByTrack[trackId] = milestone

    const titles = eligibleTitles(milestoneByTrack)
    const title = titles.indexOf(this.state.title) === -1 ? titles[0] : this.state.title

    this.setState({ milestoneByTrack, focusedTrackId: trackId, title })
  }

  shiftFocusedTrack(delta: number) {
    let index = trackIds.indexOf(this.state.focusedTrackId)
    index = (index + delta + trackIds.length) % trackIds.length
    const focusedTrackId = trackIds[index]
    this.setState({ focusedTrackId })
  }

  setFocusedTrackId(trackId: TrackId) {
    let index = trackIds.indexOf(trackId)
    const focusedTrackId = trackIds[index]
    this.setState({ focusedTrackId })
  }

  shiftFocusedTrackMilestoneByDelta(delta: number) {
    let prevMilestone = this.state.milestoneByTrack[this.state.focusedTrackId]
    let milestone = prevMilestone + delta
    if (milestone < 0) milestone = 0
    if (milestone > 5) milestone = 5
    this.handleTrackMilestoneChange(this.state.focusedTrackId, ((milestone: any): Milestone))
  }

  setTitle(title: string) {
    let titles = eligibleTitles(this.state.milestoneByTrack)
    title = titles.indexOf(title) == -1 ? titles[0] : title
    this.setState({ title })
  }
}

export default SnowflakeApp
