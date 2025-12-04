import { useState } from "react"

interface Assignment {
  id: number
  title: string
  description: string
  authors: { name: string; pdfUrl: string }[]
}

interface ModalContent {
  title: string
  description: string
  authors?: { name: string; pdfUrl: string }[]
  documents?: { name: string; pdfUrl: string }[] // Added to support multiple files
  pdfUrl?: string
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<ModalContent | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const assignments: Assignment[] = [
    {
      id: 1,
      title: "Assignment 1",
      description:
        "This is a placeholder description for Assignment 1. It covers the fundamental concepts and initial research phase of the Capsumi project.",
      authors: [
        { name: "Valerii Matviiv", pdfUrl: "/assignments/1-Valerii-Matviiv.pdf" },
        { name: "Author 2",        pdfUrl: "/assignments/assignment1-author2.pdf" },
        { name: "Author 3",        pdfUrl: "/assignments/assignment1-author3.pdf" },
        { name: "Author 4",        pdfUrl: "/assignments/assignment1-author4.pdf" },
        
      ],
    },
    {
      id: 2,
      title: "Assignment 2",
      description:
        "This is a placeholder description for Assignment 2. It focuses on the implementation details and technical specifications of the project.",
      authors: [
        { name: "Author 1", pdfUrl: "/assignments/assignment2-author1.pdf" },
        { name: "Author 2", pdfUrl: "/assignments/assignment2-author2.pdf" },
        { name: "Author 3", pdfUrl: "/assignments/assignment2-author3.pdf" },
        { name: "Author 4", pdfUrl: "/assignments/assignment2-author4.pdf" },
      ],
    },
  ]

  const projectStages = [
    {
      id: 1,
      title: "Progress Stage 1",
      description: "Elaborate the project proposal and set up the project web site. Describe the problem you will try to solve during the project. Shortly, characterize the target user population. Describe the main goal of the project and a possible solution to the problem. Identifying possible similar applications.",
      pdfUrl: "/project-stages/stage1.pdf"
    },
    {
      id: 2,
      title: "Progress Stage 2",
      description: "Identification and characterization of the target users, tasks and scenarios. In this stage, it is intended to examine and understand the problem space. Who are the main users of the system? What tasks users want to perform with the system? What functionalities should be made available by the system? How is the work environment?",
      pdfUrl: "/project-stages/stage2.pdf"
    },
    {
      id: 3,
      title: "Stage 3: 1st Prototype & Usability Test",
      description: "Paper prototype of Capsumi, an app that allows people to create digital time capsules. It documents the usability test with user scenarios, sketches, storyboards, and observations of usability problems and user feedback.",
      pdfUrl: "/project-stages/stage3.pdf"
    },
    {
      id: 4,
      title: "Stage 4: Computational prototype",
      description: "Computational prototype implementation details and functionality overview.",
      pdfUrl: "/project-stages/stage4.pdf"
    },
    {
      id: 5,
      title: "Stage 5: Heuristic Evaluation",
      description: "This stage covers the heuristic evaluation process. It includes the evaluation report we sent regarding another group's project and the evaluation report we received from our peers (Group 17) about Capsumi.",
      documents: [
        { name: "Evaluation Sent (By Us)", pdfUrl: "/project-stages/stage5-sent.pdf" },
        { name: "Evaluation Received (By Group 17)", pdfUrl: "/project-stages/stage5-received.pdf" }
      ]
    }
  ]

  const uiStages = [
    {
      id: 1,
      title: "UI Development 1",
      description: "This is a placeholder for UI development milestone 1. Here you would find detailed information about the achievements, challenges, and next steps for this phase of the Capsumi project.",
      pdfUrl: undefined
    },
    {
      id: 2,
      title: "UI Development 2",
      description: "This is a placeholder for UI development milestone 2. Here you would find detailed information about the achievements, challenges, and next steps for this phase of the Capsumi project.",
      pdfUrl: undefined
    },
    {
      id: 3,
      title: "UI Development 3",
      description: "This is a placeholder for UI development milestone 3. Here you would find detailed information about the achievements, challenges, and next steps for this phase of the Capsumi project.",
      pdfUrl: undefined
    },
    {
      id: 4,
      title: "UI Development 4",
      description: "This is a placeholder for UI development milestone 4. Here you would find detailed information about the achievements, challenges, and next steps for this phase of the Capsumi project.",
      pdfUrl: undefined
    }
  ]

  const openModal = (content: ModalContent) => {
    setModalContent(content)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalContent(null)
  }

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="neomorph-flat mx-2 my-2 rounded-[1.25rem] px-4 py-3 sm:mx-4 sm:my-4 sm:px-8 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo/capsumi-logo-color.PNG" alt="Capsumi Logo" className="h-10 w-10 rounded-full" />
              <h1 className="text-xl font-bold text-foreground sm:text-2xl">Capsumi</h1>
            </div>

            <ul className="hidden items-center gap-4 md:flex lg:gap-8">
              <li>
                <a href="#about" className="font-semibold text-foreground transition-colors hover:text-accent">
                  About Us
                </a>
              </li>
              <li>
                <a href="#assignments" className="font-semibold text-foreground transition-colors hover:text-accent">
                  Assignments
                </a>
              </li>
              <li>
                <a href="#progress" className="font-semibold text-foreground transition-colors hover:text-accent">
                  Project Progress
                </a>
              </li>
              <li>
                <a href="#ui-progress" className="font-semibold text-foreground transition-colors hover:text-accent">
                  UI Development
                </a>
              </li>
              <li>
                <button
                  onClick={toggleTheme}
                  className="neomorph-flat flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:neomorph-pressed"
                >
                  {isDarkMode ? (
                    <svg className="h-5 w-5 text-foreground" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-foreground" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              </li>
            </ul>

            <div className="flex gap-1.5 md:hidden">
              <button
                onClick={toggleTheme}
                className="neomorph-flat flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:neomorph-pressed"
              >
                {isDarkMode ? (
                  <svg className="h-5 w-5 text-foreground" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-foreground" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="neomorph-flat flex h-10 w-10 items-center justify-center rounded-lg"
              >
                <svg
                  className="h-6 w-6 text-foreground"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <ul className="mt-4 flex flex-col gap-3 border-t border-muted pt-4 md:hidden">
              <li>
                <a
                  href="#about"
                  onClick={handleNavClick}
                  className="block font-semibold text-foreground transition-colors hover:text-accent"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#assignments"
                  onClick={handleNavClick}
                  className="block font-semibold text-foreground transition-colors hover:text-accent"
                >
                  Assignments
                </a>
              </li>
              <li>
                <a
                  href="#progress"
                  onClick={handleNavClick}
                  className="block font-semibold text-foreground transition-colors hover:text-accent"
                >
                  Project Progress
                </a>
              </li>
              <li>
                <a
                  href="#ui-progress"
                  onClick={handleNavClick}
                  className="block font-semibold text-foreground transition-colors hover:text-accent"
                >
                  UI Development
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>

      <section id="about" className="px-4 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 inline-block border-b-4 border-accent pb-2 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            About Us
          </h2>
          <div className="neomorph mt-8 rounded-[1.25rem] p-6 sm:mt-12 sm:p-8 lg:p-12">
            <p className="text-base leading-relaxed text-foreground sm:text-lg">
              The name <span className="font-bold text-accent">Capsumi</span> comes from the word{" "}
              <span className="font-bold">"capsule"</span> — a vessel used to hold memories, messages, and artifacts that tell a story over time. Our project builds on that idea, focusing on collecting and sharing meaningful memories that reflect everyday life and personal experiences.
              <br /><br />
              Coincidentally, Capsumi also means strawberries in Romanian — a discovery that felt special to us. During our Erasmus semester in Portugal, we met some amazing Romanian flatmates, and this connection inspired our choice of the strawberry as our logo. With them being Romanian, the idea of strawberries became our own little capsule — a symbol of the friendships and memories we created together.
              <br /><br />
              Capsumi represents the idea of preserving memories — moments worth keeping and revisiting — while staying rooted in the connections and stories that shape them.
            </p>
          </div>
        </div>
      </section>

      <section id="assignments" className="px-4 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 inline-block border-b-4 border-accent pb-2 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Assignments
          </h2>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2">
            {assignments.map((assignment) => (
              <button
                key={assignment.id}
                onClick={() => openModal(assignment)}
                className="neomorph group rounded-[1.25rem] p-6 text-left transition-all hover:neomorph-pressed active:neomorph-inset sm:p-8"
              >
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent sm:text-2xl">
                  {assignment.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">
                  Click to view details and authors
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="progress" className="px-4 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 inline-block border-b-4 border-accent pb-2 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Project Progress
          </h2>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {projectStages.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  openModal({
                    title: item.title,
                    description: item.description,
                    pdfUrl: item.pdfUrl,
                    documents: item.documents
                  })
                }
                className="neomorph group rounded-[1.25rem] p-6 text-left transition-all hover:neomorph-pressed active:neomorph-inset sm:p-8"
              >
                <h3 className="text-lg font-bold text-foreground group-hover:text-accent sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">View progress details</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="ui-progress" className="px-4 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-2 inline-block border-b-4 border-accent pb-2 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            UI Development Progress
          </h2>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {uiStages.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  openModal({
                    title: item.title,
                    description: item.description,
                    pdfUrl: item.pdfUrl
                  })
                }
                className="neomorph group rounded-[1.25rem] p-6 text-left transition-all hover:neomorph-pressed active:neomorph-inset sm:p-8"
              >
                <h3 className="text-lg font-bold text-foreground group-hover:text-accent sm:text-xl">
                  Stage {item.id}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">View progress details</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && modalContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/25 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="neomorph-modal relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[1.25rem] bg-background p-6 sm:max-h-[80vh] sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="neomorph-flat absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-2xl font-bold text-foreground transition-all hover:neomorph-pressed hover:text-accent sm:right-4 sm:top-4"
            >
              ×
            </button>
            <h3 className="mb-4 border-b-4 border-accent pb-2 pr-12 text-xl font-bold text-foreground sm:mb-6 sm:text-2xl lg:text-3xl">
              {modalContent.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-foreground sm:mb-6 sm:text-base">
              {modalContent.description}
            </p>
            {modalContent.authors && (
              <div className="mt-6 sm:mt-8">
                <h4 className="mb-3 text-lg font-bold text-foreground sm:mb-4 sm:text-xl">Authors:</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {modalContent.authors.map((author, index) => (
                    <li key={index}>
                      <a
                        href={author.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm font-semibold text-foreground transition-colors hover:text-accent sm:text-base"
                      >
                        {author.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {modalContent.documents && (
              <div className="mt-6 sm:mt-8">
                <h4 className="mb-3 text-lg font-bold text-foreground sm:mb-4 sm:text-xl">Documents:</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {modalContent.documents.map((doc, index) => (
                    <li key={index}>
                      <a
                        href={doc.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm font-semibold text-foreground transition-colors hover:text-accent sm:text-base"
                      >
                        {doc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {modalContent.pdfUrl && !modalContent.documents && (
              <div className="mt-6 sm:mt-8">
                <a
                  href={modalContent.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-semibold text-foreground transition-colors hover:text-accent sm:text-base"
                >
                  View Report
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App