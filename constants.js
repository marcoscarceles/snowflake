// @flow
import * as d3 from 'd3'
import { novumTracks } from './novumConstants.js'

const competencies = async function load() { return await loadNovumCompetencies() };

export type TrackId =
  "TIME_MANAGEMENT" | "SELF_MANAGEMENT" | "PROJECT_MANAGEMENT" | "INITIATIVE" |
  "EFFECTIVE_COMMUNICATION" | "CONFLICT_RESOLUTION" | "FLEXIBILITY_/ DEALING WITH AMBIGUITY" | "CREATIVITY_THINKING" |
  "MOTIVATING_OTHERS" | "DEVELOPING_OTHERS" | "TEAMWORK" | "ACCOMPLISHMENT" |
  "ENGINEERING_WOW PRACTICES" | "SOFTWARE_FUNDAMENTALS" | "SOFTWARE_AT SCALE" | "QUALITY" |
  "MOBILE" | "WEB_CLIENT" | "SERVER" | "FOUNDATIONS"

export type Milestone = 0 | 1 | 2 | 3 | 4 | 5

export type MilestoneMap = {
  "TIME_MANAGEMENT": Milestone,
  "SELF_MANAGEMENT": Milestone,
  "PROJECT_MANAGEMENT": Milestone,
  "INITIATIVE": Milestone,

  "EFFECTIVE_COMMUNICATION": Milestone,
  "CONFLICT_RESOLUTION": Milestone,
  "FLEXIBILITY_/ DEALING WITH AMBIGUITY": Milestone,
  "CREATIVITY_THINKING": Milestone,

  "MOTIVATING_OTHERS": Milestone,
  "DEVELOPING_OTHERS": Milestone,
  "TEAMWORK": Milestone,
  "ACCOMPLISHMENT": Milestone,

  "ENGINEERING_WOW PRACTICES": Milestone,
  "SOFTWARE_FUNDAMENTALS": Milestone,
  "SOFTWARE_AT SCALE": Milestone,
  "QUALITY": Milestone,

  "MOBILE": Milestone,
  "WEB_CLIENT": Milestone,
  "SERVER": Milestone,
  "FOUNDATIONS": Milestone,
}

export type Track = {
  displayName: string,
  category: string, // TK categoryId type?
  description: string,
  milestones: {
    summary: string,
    signals: string[],
    examples: string[]
  }[]
}

type Tracks = {
  "TIME_MANAGEMENT": Track,
  "SELF_MANAGEMENT": Track,
  "PROJECT_MANAGEMENT": Track,
  "INITIATIVE": Track,

  "EFFECTIVE_COMMUNICATION": Track,
  "CONFLICT_RESOLUTION": Track,
  "FLEXIBILITY_/ DEALING WITH AMBIGUITY": Track,
  "CREATIVITY_THINKING": Track,

  "MOTIVATING_OTHERS": Track,
  "DEVELOPING_OTHERS": Track,
  "TEAMWORK": Track,
  "ACCOMPLISHMENT": Track,

  "ENGINEERING_WOW PRACTICES": Track,
  "SOFTWARE_FUNDAMENTALS": Track,
  "SOFTWARE_AT SCALE": Track,
  "QUALITY": Track,

  "MOBILE": Track,
  "WEB_CLIENT": Track,
  "SERVER": Track,
  "FOUNDATIONS": Track,
}



export type Level = {
  name: String,
  description: string,
}

export const levels: Level = {
  items: [
    {
      name: "Level 0",
      description: "No applicable knowledge",
    },
    {
      name: "Level 1 (Basic)",
      description: "Has knowledge of the skill and an appreciation of how it is applied in the environment, while is still being able to develop efficiency.",
    },
    {
      name: "Level 2 (Developing)",
      description: "Applies knowledge and experience of the skill, including tools and techniques, adopting those most appropriate for the environment.",
    },
    {
      name: "Level 3 (Professional) (Impact at your team)",
      description: "Shares knowledge and experience of the skill with others inside your team becoming a local reference, including tools and techniques, defining those most appropriate one for the environment. They are able to challenge others, including different contexts, where this skill is applied.",
    },
    {
      name: "Level 4 (Advance) (Impact at your area)",
      description: "Has knowledge and experience in the application of this skill. Is a recognised specialist and advisor in this skill including user needs, generation of ideas, methods, tools and leading or guiding others in best practice inside your area of expertise.",
    },
    {
      name: "Level 5 (Expert) (Impact at your company)",
      description: "Leads using knowledge and experience in the application of this skill to have a direct impact building a better company.",
    }
  ]
}

export const tracks: Tracks = novumTracks

export const trackIds: TrackId[] = Object.keys(tracks)

export const milestones = [0, 1, 2, 3, 4, 5]

export const milestoneToPoints = (milestone: Milestone): number => {
  switch (milestone) {
    case 0: return 0
    case 1: return 1
    case 2: return 3
    case 3: return 6
    case 4: return 12
    case 5: return 20
    default: return 0
  }
}

export const maxLevel = milestoneToPoints(milestones[milestones.length - 1]) * trackIds.length

export const pointsToLevels = {
  '0': '1.1',
  '15': '1.2',
  '30': '1.3',
  '45': '2.1',
  '65': '2.2',
  '85': '2.3',
  '105': '3.1',
  '125': '3.2',
  '145': '3.3',
  '170': '4.1',
  '195': '4.2',
  '220': '4.3',
  '265': '5.1',
  '325': '5.2',
  '400': '5.3',
}


export const categoryIds: Set<string> = trackIds.reduce((set, trackId) => {
  set.add(tracks[trackId].category)
  return set
}, new Set())

export const categoryPointsFromMilestoneMap = (milestoneMap: MilestoneMap) => {
  let pointsByCategory = new Map()
  trackIds.forEach((trackId) => {
    const milestone = milestoneMap[trackId]
    const categoryId = tracks[trackId].category
    let currentPoints = pointsByCategory.get(categoryId) || 0
    pointsByCategory.set(categoryId, currentPoints + milestoneToPoints(milestone))
  })
  return Array.from(categoryIds.values()).map(categoryId => {
    const points = pointsByCategory.get(categoryId)
    return { categoryId, points: pointsByCategory.get(categoryId) || 0 }
  })
}

export const totalPointsFromMilestoneMap = (milestoneMap: MilestoneMap): number =>
  trackIds.map(trackId => milestoneToPoints(milestoneMap[trackId]))
    .reduce((sum, addend) => (sum + addend), 0)

export const categoryColorScale = d3.scaleOrdinal()
  .domain(categoryIds)
  .range(['#00abc2', '#428af6', '#9f43e1', '#e1439f', '#e54552'])

export const titles = [
  { label: 'Engineer I', minPoints: 0, maxPoints: 45 },
  { label: 'Engineer II', minPoints: 46, maxPoints: 105 },
  { label: 'Senior Engineer', minPoints: 106, maxPoints: 170 },
  { label: 'Group Lead', minPoints: 106, maxPoints: 170 },
  { label: 'Staff Engineer', minPoints: 171, maxPoints: 265 },
  { label: 'Senior Group Lead', minPoints: 171, maxPoints: 265 },
  { label: 'Principal Engineer', minPoints: 266 },
  { label: 'Director of Engineering', minPoints: 266 }
]

export const eligibleTitles = (milestoneMap: MilestoneMap): string[] => {
  const totalPoints = totalPointsFromMilestoneMap(milestoneMap)

  return titles.filter(title => (title.minPoints === undefined || totalPoints >= title.minPoints)
    && (title.maxPoints === undefined || totalPoints <= title.maxPoints))
    .map(title => title.label)
}
