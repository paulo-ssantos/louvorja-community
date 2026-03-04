---
stepsCompleted: [step-01-init, step-02-discovery, step-02b-vision, step-02c-executive-summary, step-03-success, step-04-journeys, step-05-domain, step-06-innovation, step-07-project-type, step-08-scoping, step-09-functional, step-10-nonfunctional, step-11-polish]
inputDocuments:
  - docs/lja-community-blueprint.md
  - _bmad-output/planning-artifacts/product-brief-lja-community-2026-02-27.md
workflowType: 'prd'
briefCount: 1
researchCount: 0
brainstormingCount: 0
projectDocsCount: 0
classification:
  projectType: Web App / SaaS
  domain: Community / Religious Organization
  complexity: low
  projectContext: greenfield
---

# Product Requirements Document - lja-community

**Author:** Paulo Santos
**Date:** 2026-02-27

## Executive Summary

LouvorJA Community is a web-based platform that centralizes resource sharing and open-source project collaboration for Brazilian Adventist church housemix teams. The platform addresses fragmentation of LJA collections, housemix resources, and developer projects currently shared through WhatsApp groups.

**Target Users:**
- Primary: Church housemix teams (small churches: 1 person, large churches: 4-8 persons)
- Secondary: Adventist developers who want to contribute to church-related open-source projects

**Problem Solved:**
- No centralized hub for sharing and discovering custom LJA collections
- Difficulty finding relevant housemix tools and resources
- Developers unable to find active projects to contribute to
- WhatsApp groups are closed, ephemeral, and unsearchable

### What Makes This Special

**Core Differentiator:** Community-driven curation with ranking system
- Self-sustaining ecosystem where the community determines what's relevant through voting
- Points/reputation system recognizing contributors
- Bridge between non-technical users (resource sharing) and developers (project contribution)

**Value Proposition:** "A centralized hub to make your church housemix easier"

**Why Now:**
- LJA v2 is being built (will bring visibility)
- Multiple open-source projects have emerged but are fragmented
- No centralized hub exists for housemix contributors

## Project Classification

- **Project Type:** Web App / SaaS
- **Domain:** Community / Religious Organization
- **Complexity:** Low
- **Project Context:** Greenfield

## Success Criteria

### User Success

- **Collection Discovery**: Users find and download LJA collections in minutes, not hours
- **Tool Discovery**: Users discover tools that improve their house mix workflow
- **Contribution**: Users contribute their own collections and receive recognition
- **Search Success**: 80%+ of searches return relevant results
- **Ease of Use**: Platform is intuitive for users with mixed technical comfort levels

### Business Success

**Month 3 (Launch Phase):**
- 50+ registered users
- 10+ churches represented
- 20+ LJA collections shared
- 10+ tools/platforms listed

**Month 6 (Growth Phase):**
- 150+ registered users
- 30+ churches represented
- 50+ LJA collections
- 30+ tools/platforms
- 5+ active projects in Developer Hub
- 30%+ monthly user return rate

**Month 12 (Maturity Phase):**
- 500+ registered users
- 100+ churches represented
- Self-sustaining content (community adds more than decays)
- 10+ active projects in Developer Hub
- At least 2 projects with new contributors

### Technical Success

- **Performance**: 
  - Page load: under 2 seconds
  - Search results: under 500ms
- **Reliability**: 99%+ uptime
- **Ease of Use**: Intuitive UI/UX for users with mixed technical comfort
- **Scalability**: Architecture supports growth from 50 to 500+ users

### Measurable Outcomes

- Search relevance: 80%+ of searches return relevant results
- Monthly engagement: 30%+ of registered users return monthly
- Content growth: Collections and tools added per month exceed decay
- Developer activity: Active projects (at least 1 commit in last 30 days OR has open issues labeled "good first issue") with new contributions

## Product Scope

### MVP - Minimum Viable Product

1. **LJA Collection Sharing** - Upload/share, metadata, download
2. **Browse & Search** - Search by name/category, filter recent/popular
3. **Ranking/Voting** - Upvote, Top 5 by category
4. **Tool/Website Listings** - Submit tools, browse by category
5. **Basic User Profiles** - Contributor history
6. **Developer Hub** - GitHub linking, stars, "How to Contribute"

### Growth Features (Post-MVP)
- Advanced search, notifications, gamification/badges, API

### Vision (Future)
- Mobile app, LJA software integration, Discord/WhatsApp notifications, analytics

## User Journeys

### João - The Solo Operator (Primary User - Success Path)

**Opening Scene:**
It's Thursday night. João just finished his full-time job and is preparing for Sabbath service tomorrow. He remembers that Maria from another church mentioned a great LJA collection for contemplative moments during worship. He searches his WhatsApp messages... nothing. He asks in a group... no response. It's getting late.

**Rising Action:**
Frustrated, João opens LouvorJA Community on his phone. He searches "Maria collection" in the search bar. Nothing. He browses "Collections" category and scrolls through popular items. There it is - "Maria's Contemplative Collection" - 47 upvotes, Top 5 in "Worship" category.

**Climax:**
One click to download. The collection is exactly what he needed. He thinks: "This is exactly what I needed."

**Resolution:**
Tomorrow's service runs smoothly. João bookmarks the platform for next time. He returns two weeks later when he needs a different collection - and finds it in minutes.

*(Edge Case - Empty Search: If search returns zero results, show helpful suggestions: "No results found. Try browsing popular categories or submit this collection yourself!")*

---

### Pedro - The Power User (Primary User - Contribution Path)

**Opening Scene:**
Pedro leads the house mix team at a large church. They have 5 custom LJA collections that their team uses weekly. Currently, these live on his personal Google Drive, shared manually with team members through WhatsApp.

**Rising Action:**
Pedro hears about LouvorJA Community. He signs up and explores the platform. He sees other churches sharing collections with clear metadata and categories. He realizes: "Our team's collections could help others too."

**Climax:**
Pedro creates a profile and uploads his team's best collection. He adds description, category tags, and a brief "how to use" guide. Within 24 hours, other churches are downloading and upvoting. His collection reaches "Top 5" in its category.

**Resolution:**
Pedro becomes an active contributor, sharing all 5 team collections. He checks the platform weekly to see new downloads and feedback. He introduces the platform to his entire team as the "official" resource hub.

*(Versioning: When Pedro updates his collection, version history is maintained so users can access previous versions if needed)*

---

### Ana - The Curious Coordinator (Primary User - Discovery Path)

**Opening Scene:**
Ana is always looking for ways to improve her church's worship experience. She has 3 people on her team - one for live, one for projection, one for mixing. She spends time researching tools online, asking in WhatsApp groups for recommendations.

**Rising Action:**
A friend mentions LouvorJA Community. Ana visits the platform and browses "Tools" section. She discovers "tiny png equivalent for church use" - she never knew such tools existed. She explores more categories and finds OBS plugins specifically recommended for church live streaming.

**Climax:**
She bookmark three tools to try. The following Sabbath, she introduces one new tool to their workflow. It saves 15 minutes during setup.

**Resolution:**
Ana becomes the "researcher" for her team, checking LouvorJA Community monthly for new tools and collections. She contributes her own discoveries back to the platform.

*(Featured Section: Platform includes "New This Week" and "Featured" sections to help users like Ana discover tools they never knew existed)*

---

### Developer - Technical Contributor (Secondary User - Contribution Path)

**Opening Scene:**
Lucas is an Adventist software developer who works in tech during the week. He wants to contribute to church-related open-source projects but doesn't know where to find them. He has searched GitHub but can't identify which projects are active or welcoming contributors.

**Rising Action:**
A friend who uses LouvorJA Community for LJA collections mentions there's also a Developer Hub. Lucas visits and sees several church-related projects with clear "How to Contribute" sections.

**Climax:**
He finds a project matching his skills (a Python tool for church announcements). He sees it has open issues labeled "good first issue." He makes his first contribution - a documentation fix - within his lunch break.

**Resolution:**
Lucas checks the Developer Hub monthly for new projects. He contributes to two more projects over the next 6 months. He recommends the platform to other developer friends.

*(Submit Project Flow: Maintainers can submit their projects to the Developer Hub with GitHub link, description, and contribution guidelines)*

---

### Journey Requirements Summary

These journeys reveal the following capability needs:

1. **Search & Discovery**
   - Fast, relevant search results
   - Category browsing and filtering
   - Clear metadata for collections and tools
   - **Empty state handling** with helpful suggestions

2. **Contribution Flow**
   - Simple upload/submission process
   - Metadata input (name, description, category)
   - User profile with contribution history
   - **Collection versioning** for updates

3. **Ranking & Curation**
   - Upvote system
   - "Top 5 by category" display
   - **Featured/New sections** for discovery
   - Community-driven visibility

4. **User Profiles**
   - Public contributor profiles
   - Download counts and upvote totals
   - Contribution history

5. **Developer Hub**
   - GitHub project integration
   - Activity indicators (recent commits)
   - Clear "How to Contribute" sections
   - Good first issue labeling
   - **Submit Project flow** for maintainers

## Web App Specific Requirements

### Tech Stack (Confirmed)

- **Frontend**: Nuxt.js (Vue.js framework)
- **Backend**: NestJS
- **Database & Auth**: Supabase (self-hosted)
- **File Storage**: Supabase Storage

### Project-Type Overview

- **Architecture**: Multi-Page Application (MPA)
- **Target**: Brazilian Adventist church community
- **Primary Use**: Resource discovery and contribution platform

### Technical Architecture Considerations

**Browser Support:**
- Modern browsers: Edge, Firefox, Chrome (desktop)
- No legacy browser support required
- Mobile-responsive for basic access

**SEO Strategy:**
- SEO is important for discoverability
- Collections and tools should be indexed by search engines
- Clean URL structure for sharing
- Meta tags for social sharing

**Accessibility:**
- Basic WCAG compliance
- Keyboard navigation support
- Screen reader friendly structure

**Performance Targets:**
- Page load: under 2 seconds
- Search results: under 500ms

### Implementation Considerations

**Tech Stack Implementation:**
- **Nuxt.js**: SSR/SSG for SEO optimization
- **NestJS**: REST API backend
- **Supabase (self-hosted)**: Database, auth, and file storage
- **Supabase Storage**: LJA collection file hosting

**SEO Requirements:**
- Server-side rendering for SEO
- Semantic HTML structure
- Sitemap generation
- Open Graph tags for social sharing

**No Real-Time Features:**
- No live updates required
- No WebSocket connections needed
- Basic HTTP/HTTPS only

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-Solving MVP
- Focus on core value proposition: centralized resource sharing
- Launch with essential features only
- Validate with real users before adding complexity

**Resource Requirements:**
- Solo developer (you)
- ~2 hours/week availability
- Self-hosted Supabase for simplicity

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
1. João's journey: Search and download LJA collections
2. Pedro's journey: Upload and share collections
3. Ana's journey: Discover tools
4. Developer's journey: Browse and contribute to projects

**Must-Have Capabilities:**
- LJA Collection upload/download
- Search and browse by category
- Upvote ranking system
- Tool/website listings
- Basic user profiles
- Developer Hub with GitHub linking

### Post-MVP Features

**Phase 2 (Growth):**
- Collection versioning
- Advanced search
- Featured/New sections
- Submit Project flow for Developer Hub

**Phase 3 (Expansion):**
- Mobile app
- Notifications
- Gamification/badges
- API access

### Risk Mitigation Strategy

**Technical Risks:**
- Self-hosted Supabase requires DevOps setup
- Mitigation: Use Supabase Cloud for faster startup, migrate later

**Market Risks:**
- Community adoption depends on word-of-mouth
- Mitigation: Start with your network, leverage LJA v2 launch

**Resource Risks:**
- Limited time (~2h/week)
- Mitigation: Strict MVP scope, defer non-essentials

## Functional Requirements

### User Management

- FR1: Users can register using email/password via Supabase Auth
- FR2: Users can log in and maintain session
- FR3: Users can view their public profile showing contribution history
- FR4: Users can see their uploaded collections and download counts

### Collection Management

- FR5: Users can upload LJA collection files with metadata (name, description, category)
- FR6: Users can download LJA collections shared by others
- FR7: Users can update their own uploaded collections
- FR8: Collections display metadata: name, description, category, uploader, upload date
- FR9: Users can delete their own collections

### Content Discovery

- FR10: Users can search collections by name or description
- FR11: Users can browse collections by category
- FR12: Users can filter collections by recent or popular
- FR13: Empty search results show helpful suggestions
- FR14: Users can browse tools/websites by category

### Ranking & Voting

- FR15: Users can upvote collections they find useful
- FR16: Collections display upvote count
- FR17: Platform displays "Top 5" collections per category
- FR18: Each user can only upvote a collection once (user can upvote multiple collections)

### Tool Listings

- FR19: Users can submit tools/websites with name, description, category, and URL
- FR20: Tools display click count
- FR21: Tools can be browsed by category

### Developer Hub

- FR22: Platform displays list of open-source projects
- FR23: Each project shows GitHub link, description, stars count
- FR24: Each project shows "How to Contribute" section
- FR25: Projects display recent activity indicator
- FR26: Users can submit projects to Developer Hub

### User Profiles

- FR27: User profiles display username and avatar
- FR28: User profiles show list of contributed collections
- FR29: User profiles show contribution count

## Non-Functional Requirements

### Performance

- Page load time: under 2 seconds
- Search results: under 500ms
- File download: Depends on file size and network

### Security

- User authentication via Supabase Auth
- Passwords hashed by Supabase
- File storage secured through Supabase Storage policies
- No sensitive data storage required

### Scalability

- MVP supports 50+ users
- Growth phase supports 150+ users
- Architecture supports 500+ users
- Database: Supabase handles scaling

### Accessibility

- Basic WCAG compliance
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
