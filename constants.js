// @flow
import * as d3 from 'd3'

export type TrackId = 'MOBILE' | 'WEB_CLIENT' | 'FOUNDATIONS' | 'SERVERS' |
  'ENGINEERING_PRACTICES' | 'SOFTWARE_FUNDAMENTALS' | 'QUALITY' | 'SOFTWARE_SCALE' | 'PROJECT_MANAGEMENT' |
  'TIME_MANAGEMENT' | 'EFFECTIVE_COMMUNICATION' | 'CONFLICT_RESOULTION' | 'SELF_MANAGEMENT' | 'INITIATIVE' | 'FLEXIBILITY' | 'CREATIVE_THINKING' |
  'MOTIVATING_OTHERS' | 'DEVELOPING_OTHERS' | 'TEAMWORK' | 'ACCOMPLISHMENT'

export type Milestone = 0 | 1 | 2 | 3 | 4 | 5

export type MilestoneMap = {
  'MOBILE': Milestone,
  'WEB_CLIENT': Milestone,
  'FOUNDATIONS': Milestone,
  'SERVERS': Milestone,

  'ENGINEERING_PRACTICES': Milestone,
  'SOFTWARE_FUNDAMENTALS': Milestone,
  'QUALITY': Milestone,
  'SOFTWARE_SCALE': Milestone,
  'PROJECT_MANAGEMENT': Milestone,

  'TIME_MANAGEMENT': Milestone,
  'EFFECTIVE_COMMUNICATION': Milestone,
  'CONFLICT_RESOULTION': Milestone,
  'SELF_MANAGEMENT': Milestone,
  'INITIATIVE': Milestone,
  'FLEXIBILITY': Milestone,
  'CREATIVE_THINKING': Milestone,

  'MOTIVATING_OTHERS': Milestone,
  'DEVELOPING_OTHERS': Track,
  'TEAMWORK': Track,
  'ACCOMPLISHMENT': Track,
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
  'MOBILE': Track,
  'WEB_CLIENT': Track,
  'FOUNDATIONS': Track,
  'SERVERS': Track,

  'ENGINEERING_PRACTICES': Track,
  'SOFTWARE_FUNDAMENTALS': Track,
  'QUALITY': Track,
  'SOFTWARE_SCALE': Track,
  'PROJECT_MANAGEMENT': Track,

  'TIME_MANAGEMENT': Track,
  'EFFECTIVE_COMMUNICATION': Track,
  'CONFLICT_RESOULTION': Track,
  'SELF_MANAGEMENT': Track,
  'INITIATIVE': Track,
  'FLEXIBILITY': Track,
  'CREATIVE_THINKING': Track,

  'MOTIVATING_OTHERS': Track,
  'DEVELOPING_OTHERS': Track,
  'TEAMWORK': Track,
  'ACCOMPLISHMENT': Track,

}



export type Level = {
  name: String,
  description: string,
}

export const levels: Level = { items: [
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
]}

export const tracks: Tracks = {

  /*
   * Engineering - Building
   */

  "MOBILE": {
    "displayName": "Mobile",
    "category": "A",
    "description": "Develops expertise in native mobile platform engineering, such as iOS or Android",
    "milestones": [{
      "summary": "Works effectively within established iOS or Android architectures, following current best practices",
      "signals": [
        "Delivers features requiring simple local modifications",
        "Adds simple actions that call server endpoints",
        "Reuses existing components appropriately",
      ],
      "examples": [
        "Added existing button to a different iOS surface",
        "Add follow button for publications on Android",
        "Fetched and displayed a new stream, using existing stream item styles",
      ],
    }, {
      "summary": "Develops new instances of existing architecture, or minor improvements to existing architecture",
      "signals": [
        "Defines new useful and appropriate proto-generated objects",
        "Creates simple new activities on Android",
        "Migrates code from old patterns to new patterns",
      ],
      "examples": [
        "Upgraded SDWebImage to a new major version",
        "Added support for rendering a new type of stream item",
        "Prototyped a simple new feature quickly",
      ],
    }, {
      "summary": "Designs major new features and demonstrates a nuanced understanding of mobile platform constraints",
      "signals": [
        "Implements complex features with a large product surface area",
        "Works effectively with  Android reactive programming framework",
        "Adds support for new iOS features after a major iOS version upgrade",
      ],
      "examples": [
        "Designed iOS caching strategy for offline reading",
        "Built series reader on Android",
        "Informed the team about recent best practice changes and deprecations",
      ],
    }, {
      "summary": "Builds complex, reusable architectures that pioneer best practices and enable engineers to work more effectively",
      "signals": [
        "Pioneers architecture migration strategies that reduce programmer burden",
        "Fixes subtle memory management issues",
        "Implements interactive dismissals that bring delight",
      ],
      "examples": [
        "Upgraded CocoaPods to a new major version",
        "Designed architecture for fetching and rendering stream items",
        "Migrated Android persistance layer to reactive programming",
      ],
    }, {
      "summary": "Is an industry-leading expert in mobile engineering or sets strategic mobile direction for an eng team",
      "signals": [
        "Defines long-term goals and ensures active projects are in service of them",
        "Designs and builds innovative, industry-leading UI interactions",
        "Invents new techniques to responsibly stretch limits of the Android platform",
      ],
      "examples": [
        "Defined and drove complete migration plan to Swift or Kotlin",
        "Implemented Android recycler views before platform support existed",
        "Pioneered application-level abstractions for multi-app environment",
      ],
    }],
  },

  "WEB_CLIENT": {
    "displayName": "Web client",
    "category": "A",
    "description": "Develops expertise in web client technologies, such as HTML, CSS, and JavaScript",
    "milestones": [{
      "summary": "Works effectively within established web client architectures, following current best practices",
      "signals": [
        "Makes minor modifications to existing screens",
        "Fixes simple design quality issues",
        "Uses CSS appropriately, following style guide",
      ],
      "examples": [
        "Implemented sticky footer on the post page",
        "Hooked up the action to dismiss a post from a stream",
        "Built PaymentHistory screen using ResponseScreen",
      ],
    }, {
      "summary": "Develops new instances of existing architecture, or minor improvements to existing architecture",
      "signals": [
        "Makes sensible abstractions based on template and code patterns",
        "Specs and builds interactive components independently",
        "Prototypes simple new features quickly",
      ],
      "examples": [
        "Built credit card input component",
        "Created shared buttons template",
        "Built modal system",
      ],
    }, {
      "summary": "Designs major new features and demonstrates a nuanced understanding of browser constraints",
      "signals": [
        "Provides useful design feedback and suggests feasible alternatives",
        "Performs systemic tasks to significantly minimise bundle size",
        "Acts a caretaker for all of web client code",
      ],
      "examples": [
        "Designed font loading strategy for Medium",
        "Researched utility of service workers for Medium",
        "Designed and implemented ResponseScreen",
      ],
    }, {
      "summary": "Builds complex, reusable architectures that pioneer best practices and enable engineers to work more effectively",
      "signals": [
        "Pioneers architecture migrations that reduce programmer burden",
        "Implements complex UI transitions that bring delight",
        "Makes architectural decisions that eliminate entire classes of bugs",
      ],
      "examples": [
        "Designed Medium's post morpher and delta system",
        "Implemented Medium's scrolling text over image blur",
        "Designed and pioneered proto-based model storage",
      ],
    }, {
      "summary": "Is an industry-leading expert in web client or sets strategic web client direction for an eng team",
      "signals": [
        "Invents new techniques to innovate and overcome browser constraints",
        "Identifies and solved systemic problems with current architecture",
        "Defines a long-term vision for web client and ensures projects are in service of it",
      ],
      "examples": [
        "Invented CSS in JS",
        "Defined and drove migration strategy to Lite",
        "Implemented unidirectional data flow to completion",
      ],
    }],
  },

  "FOUNDATIONS": {
    "displayName": "Foundations",
    "category": "A",
    "description": "Develops expertise in foundational systems, such as deployments, pipelines, databases and machine learning",
    "milestones": [{
      "summary": "Works effectively within established structures, following current best practices",
      "signals": [
        "Writes thorough postmortems for service outages",
        "Makes simple configuration changes to services",
        "Performs backfills safely and effectively, without causing pages",
      ],
      "examples": [
        "Made safe and effective Ansible changes",
        "Implemented new ETL pipelines based on existing ones",
        "Resolved out of disk errors independently",
      ],
    }, {
      "summary": "Develops new instances of existing architecture, or minor improvements to existing architecture",
      "signals": [
        "Made minor version upgrades to technologies",
        "Builds machine learning jobs within the ML framework",
        "Triages service issues correctly and independently",
      ],
      "examples": [
        "Upgraded NodeJS from 8.0 to 8.1.1",
        "Built custom packages for RPMs",
        "Improved ETL efficiency by improving Dynamo to S3 loading",
      ],
    }, {
      "summary": "Designs standalone systems of moderate complexity, or major new features in existing systems",
      "signals": [
        "Acts as primary maintainer for existing critical systems",
        "Designs moderately complex systems",
        "Makes major version upgrades to libraries",
      ],
      "examples": [
        "Designed Ansible configuration management",
        "Built Medium's realtime stats pipeline",
        "Designed flexible framework for writing machine learning jobs",
      ],
    }, {
      "summary": "Builds complex, reusable architectures that pioneer best practices for other engineers, or multi-system services",
      "signals": [
        "Designs complex projects that encompass multiple systems and technologies",
        "Demonstrates deep knowledge of foundational systems",
        "Introduces new databases and technologies to meet underserved needs",
      ],
      "examples": [
        "Designed and built BBFD",
        "Designed AWS configuration management",
        "Introduced Kinesis and pioneered streaming events pipeline",
      ],
    }, {
      "summary": "Is an industry-leading expert in foundational engineering or sets strategic foundational direction for an eng team",
      "signals": [
        "Designs transformational projects in service of long-term goals",
        "Defines the strategic vision for foundational work and supporting technologies",
        "Invents industry-leading techniques to solve complex problems",
      ],
      "examples": [
        "Invented a novel ML technique that advanced the state of the art",
        "Defined and developed Medium's continuous delivery strategy",
        "Developed and implemented HA strategy",
      ],
    }],
  },

  "SERVERS": {
    "displayName": "Servers",
    "category": "A",
    "description": "Develops expertise in server side engineering, using technologies such as Go, NodeJS, or Scala",
    "milestones": [{
      "summary": "Works effectively within established server side frameworks, following current best practices",
      "signals": [
        "Adds NodeJS endpoints using layers architecture",
        "Adds golang endpoints using Gotham architecture",
        "Makes minor server changes to support client needs",
      ],
      "examples": [
        "Added IFTTT trigger for new bookmark to medium2",
        "Added delete audio route to Buggle",
        "Queried a Dynamo LSI appropriately",
      ],
    }, {
      "summary": "Develops new instances of existing architecture, or minor improvements to existing architecture",
      "signals": [
        "Assesses correctness and utility of existing code and avoids blind copy-pasting",
        "Generalizes code when appropriate",
        "Determines data needs from product requirements",
      ],
      "examples": [
        "Identified need for new index on Dynamo",
        "Acted as caretaker for routes protos",
        "Updated Facebook API version and codebase dependencies",
      ],
    }, {
      "summary": "Designs standalone systems of moderate complexity, or major new features in existing systems",
      "signals": [
        "Acts as primary maintainer for existing critical systems",
        "Integrates third party services effectively",
        "Writes playbooks for new service maintenance",
      ],
      "examples": [
        "Implemented Google Auth login to Medium",
        "Implemented payments integration with Stripe",
        "Built Textshots server",
      ],
    }, {
      "summary": "Builds complex, reusable architectures that pioneer best practices for other engineers, or multi-system services",
      "signals": [
        "Delivers complex systems that achieve their goals",
        "Avoids subtle architectural mistakes when considering new systems",
        "Makes appropriate buy vs build choices",
      ],
      "examples": [
        "Designed Medium's ranked feed architecture",
        "Designed custom domains architecture",
        "Created Gotham framework for creating Go services",
      ],
    }, {
      "summary": "Is an industry-leading expert in server side engineering or sets strategic server side direction for an eng team",
      "signals": [
        "Designs transformational projects of significant complexity and scope",
        "Makes decisions that have positive, long term, wide ranging consequences",
        "Identifies and solves systemic problems with current architecture",
      ],
      "examples": [
        "Researched, vetted, and selected Go as Medium's statically typed language",
        "Defined microservices architecture and medium2 migration plan",
        "Defined and implemented proprietary IP core to the company's success",
      ],
    }],
  },

  /*
   * Engineering - Fundamentals
   */

  "ENGINEERING_PRACTICES": {
    "displayName": "Engineering Practices",
    "category": "B",
    "description": "Makes Novum's solutions robust and aids rapid value delivery by applying stablished engineering practices and patterns and/or promotes alternatives ways of working for achieving the same goal.",
    "milestones": [{
      "summary": "Produces software according to the industry stablished good practices standards.	",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Recognises and efficiently applies principles of working with software like DRY, KISS, YAGNI (among others).",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Delivers solutions efficiently, maximising the delivery of value to the current context	",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Is an early-adopter of software engineering methodologies. Promotes XP practices, producing tooling and mentoring to ease the introduction of  delivery patterns	",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Is an innovator in the context of methodologies and ways of working, introducing patterns that maximise the value throughput of the company	",
      "signals": [
      ],
      "examples": [
      ],
    }],
  },

  "SOFTWARE_FUNDAMENTALS": {
    "displayName": "Software Fundamentals",
    "category": "B",
    "description": "Ability to effectively work with software by applying knowledge to day to day tasks and software design. Understanding and mastering the underlying difficulties of working with software, from correctness and efficiency to resilience and scalability.",
    "milestones": [
      {
        "summary": "Develops a small code task like a product improvement or bugfixing.",
        "signals": [
        ],
        "examples": [
        ],
      }, {
        "summary": "Develops a service through your team.",
        "signals": [
        ],
        "examples": [
        ],
      }, {
        "summary": "Develops a product through your team.",
        "signals": [
        ],
        "examples": [
        ],
      }, {
        "summary": "Develops a complex product with a significant amount of different teams.",
        "signals": [
        ],
        "examples": [
        ],
      }, {
        "summary": "Manages major company technology changes by multiple areas.",
        "signals": [
        ],
        "examples": [
        ],
      }],
  },

  "QUALITY": {
    "displayName": "Quality",
    "category": "B",
    "description": "Embeds Quality to the Products they deliver at every stage, from inception to delivery.",
    "milestones": [
      {
        "summary": "Embeds quality in the delivery of a solution to a well defined problem.",
        "signals": [
        ],
        "examples": [
        ],
      }, {
        "summary": "Embeds qualtity in the delivery of complex solutions, during component integration.",
        "signals": [
        ],
        "examples": [
        ],
      }, {
        "summary": "Embeds quality during product definition (functional and non-functional).",
        "signals": [
        ],
        "examples": [
        ],
      }, {
        "summary": "Promotes a quality culture, where it is embeded from the inception of the product to its delivery.",
        "signals": [
        ],
        "examples": [
        ],
      }, {
        "summary": "Embeds quality in the company's culture.",
        "signals": [
        ],
        "examples": [
        ],
      }],
  },

  "SOFTWARE_SCALE": {
    "displayName": "Software at Scale",
    "category": "B",
    "description": "Delivers software that can be used at large scale with growth capacity without compromising user experience, availability and operational costs. Delivers software that is widely available and effectively performs in wide spectrum of scenarios (not necessarily all being well-intended).",
    "milestones": [
      {
        "summary": "Recognises complexities of delivering software at large scale.",
        "signals": [
        ],
        "examples": [
        ],
      }, {
        "summary": "Effectively manages local resources or within a limited scope.",
        "signals": [
        ],
        "examples": [
        ],
      }, {
        "summary": "Has in-depth understanding of capacity constraints and efficiently manages scalability of small to medium sized components.",
        "signals": [
        ],
        "examples": [
        ],
      }, {
        "summary": "Has in-depth understanding of capacity constraints and produces solutions reusable beyond a single component.",
        "signals": [
        ],
        "examples": [
        ],
      }, {
        "summary": "Is a leading role at CTO scope in scalability and performance.",
        "signals": [
        ],
        "examples": [
        ],
      }],
  },

  "PROJECT_MANAGEMENT": {
    "displayName": "Project Management",
    "category": "B",
    "description": "Delivers well-scoped programs of work that meet their goals, on time, to budget, harmoniously.",
    "milestones": [{
      "summary": "Effectively delivers individual tasks.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Effectively delivers small personal projects.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Effectively delivers projects through a small team.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Effectively delivers projects through a large team, or with a significant amount of stakeholders or complexity.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Manages major company pushes delivered by multiple teams.",
      "signals": [
      ],
      "examples": [
      ],
    }],
  },

  /*
   * General - Executing
   */

  "TIME_MANAGEMENT": {
    "displayName": "Time Management",
    "category": "C",
    "description": "The ability to get things done effectively and efficiently, which means the right things done at the right time, with the appropriate amount of time spent on them. Time Management involves analyzing how time is spent, and then prioritizing different work tasks. Imply respecting other's time and team members time management.",
    "milestones": [{
      "summary": "Effectively managing one’s time and resources to ensure that work is completed efficiently.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Plans the use of his or her time. Concentrates his or her efforts on priorities.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Uses time effectively and efficiently. Concentrates efforts on the most important priorities.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Places a high value on own time and plans tasks accordingly. Makes quality time for the most important priorities.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Uses time and energy efficiently for self and others.",
      "signals": [
      ],
      "examples": [
      ],
    }],
  },

  "EFFECTIVE_COMMUNICATION": {
    "displayName": "Effective Communication",
    "category": "C",
    "description": "The ability to actively listen and to communicate clearly with others in a straightforward way	",
    "milestones": [{
      "summary": "Communicates effectively to close stakeholders when called upon, and incorporates constructive feedback	",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Communicates appropriately, focusing on timeliness and good quality conversations	",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Proactively shares information, actively solicits feedback, and facilitates communication for multiple stakeholder	",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Communicates complex ideas skillfully and with nuance, and establishes alignment within the wider organization	",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Influences outcomes at the highest level, moves beyond mere broadcasting, and sets best practices for others	",
      "signals": [
      ],
      "examples": [
      ],
    }],
  },

  "CONFLICT_RESOULTION": {
    "displayName": "Conflict Resolution",
    "category": "C",
    "description": "Involves having the ability to help others through emotional or tense situations, tactfully bring disagreements into the open, and define solutions that everyone can endorse. Leaders who take time to understand different perspectives work toward finding a common ground on which everyone can agree. They acknowledge the views of all sides, while redirecting the energy toward a shared ideal or an agreeable resolution.",
    "milestones": [{
      "summary": "Identifies conflict situations and is aware of some actions that must be taken.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Identifies conflict sitations and is able to articulate some solutions.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Solve conflicts successfully and is able to propose imparcial solutions.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Is proactive, sees the problem ahead and is accepted as an impartial part for others.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Is capable of solving complex conflict situations and able to anticipate them. Is also able to trace a plan seen fair and respected by parties involve.",
      "signals": [
      ],
      "examples": [
      ],
    }],
  },

  "SELF_MANAGEMENT": {
    "displayName": "Self Management	",
    "category": "C",
    "description": "Must be able to use introspection, self-evaluation and self-management techniques in order to pro-actively and continuously improve own behavior and performance.",
    "milestones": [{
      "summary": "Able to control emotions and respect others task and responsibilities.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Deliberately puts emotions aside and is able to keep calm in certain situations asking for help when needed.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Works with a long plan mentallity, not only able to think in themselves but in the team as whole to solve complex situations. Is permeable to ideas and constrcutive feedback to get better otcomes.",
      "signals": [
      ],
      "examples": [
      ],
    }],
  },

  "INITIATIVE": {
    "displayName": "Initiative",
    "category": "C",
    "description": "Proactively identifies ways to contribute to Novum’s goals and mission; achieves results without needing reminders from others; identifies and takes action to address problems and opportunities.",
    "milestones": [{
      "summary": "Identifies opportunities for organizational change or product improvements.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Causes change to positively impact a few individuals or minor improvement to an existing product or service.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Causes change to positively impact an entire team or instigates a minor feature or service.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Effects change that has a substantial positive impact on the organization or a major product impact.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Effects change that has a substantial positive impact on the whole company.",
      "signals": [
      ],
      "examples": [
      ],
    }],
  },

  "FLEXIBILITY": {
    "displayName": "Flexibility / Dealing with Ambiguity",
    "category": "C",
    "description": "Can effectively cope with change; can shift gears comfortably; can decide and act without having the total picture; can comfortably handle risk and uncertainty.",
    "milestones": [{
      "summary": "Assumes uncertainty and is flexible to agree new terms and actions.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Given a new situation and learning from it, adapts projects in order to succeed.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Is able to implement changes and iterate constantly while changes happen, reacting quickly.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Is able to develop a successful plan in unexpected and major situations, establishing new priorities and path to follow.",
      "signals": [
      ],
      "examples": [
      ],
    }],
  },

  "CREATIVE_THINKING": {
    "displayName": "Creativity Thinking	",
    "category": "C",
    "description": "Discovering new opportunities and solutions for problems by looking beyond current practices and using innovative thinking.",
    "milestones": [{
      "summary": "Proposes new ideas within his/her role, taking his/her experience as a tool.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Generates innovative ideas within his/her role.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Creates many new innovative ideas and is able to relate different unnconected experiences to create them.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Thinks out of the box and creates new ideas and ways of  working without fear of failure.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Proposes, constantly, unique ideas using deep analysis crossing ideas and processes form a variety of sources.",
      "signals": [
      ],
      "examples": [
      ],
    }],
  },

  /*
   * General - Mentoring
   */

  "MOTIVATING_OTHERS": {
    "displayName": "Motivating Others",
    "category": "D",
    "description": "Creates a climate in which people want to do their best; can assess each person’s strengths and use them to get the best out of him or her; promotes confidence and optimistic attitudes; is someone people like working for and with.",
    "milestones": [{
      "summary": "Promotes a positive working enviroment.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Able to motivate some individuals within the organization.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Motivates wider audiences within his area of influence.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Motivates people and organizational units.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Motivates the entire organization.",
      "signals": [
      ],
      "examples": [
      ],
    }],
  },

  "DEVELOPING_OTHERS": {
    "displayName": "Developing Others	",
    "category": "D",
    "description": "The ability to retain talent and drive higher levels of employee engagement. Developing Others provides a supportive environment for enhanced performance and professional growth. It is critical to retaining talent, driving higher levels of employee engagement, and ultimately impacts an organization’s success. To develop others you need to act as a trusted advisor, acts on an independent opinion on client needs, problems/opportunities, and possibilities for implementation.",
    "milestones": [{
      "summary": "Gives insight into opportunities and helps identify individuals' strengths and weaknesses.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Formally supports and advocates for one person and provides tools to help them solve career problems.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Inspires and retains a small group of people and actively pushes them to stretch themselves.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Manages interactions and processes between groups, promoting best practices and setting a positive example.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Supports the development of a signficant part of the engineering org, and widely viewed as a trusted advisor.",
      "signals": [
      ],
      "examples": [
      ],
    }],
  },

  "TEAMWORK": {
    "displayName": "Teamwork",
    "category": "D",
    "description": "The ability to motivate, develop and build a team to achieve the highest levels of performance.",
    "milestones": [{
      "summary": "Uses tools and processes to help ensure colleagues are healthy and happy.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Creates a positive, supportive, engaging team environment for group members	",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Manages expectations across peers, leads in the org, promotes calm, and prevents consensus building.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Advocates for the needs of teams and group members, and proactively works to calm the organization.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Manages narratives, channels negativity into inspiration and motivation, and protects the entire team.",
      "signals": [
      ],
      "examples": [
      ],
    }],
  },

  "ACCOMPLISHMENT": {
    "displayName": "Accomplishment",
    "category": "D",
    "description": "Inspires day to day excellence, maximizes potential and effectively resolves performance issues with compassion.",
    "milestones": [{
      "summary": "Helps individuals identify blockers and helps them identify next steps for resolution.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Helps individuals resolve difficult performance issues, with insight, compassion, and skill.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Intervenes in long-standing performance issues with targeted behavior change or performance plans.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Mediates escalated situations, empowers underperforming teams, and resolves conflict.",
      "signals": [
      ],
      "examples": [
      ],
    }, {
      "summary": "Resolves complex organizational dysfunction, or persistent conflict at senior levels.",
      "signals": [
      ],
      "examples": [
      ],
    }],
  },

}

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
  .range(['#00abc2', '#428af6', '#e1439f', '#e54552'])

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
