import { useState, useEffect, useRef } from "react"

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
  documents?: { name: string; pdfUrl: string }[]
  images?: { src: string; alt: string }[]
  pdfUrl?: string
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<ModalContent | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  // Changed to store index for navigation
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  // Refs for touch navigation
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

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
      title: "Stage 1: Logo Suggestions",
      description: "Initial sketches and concepts for the Capsumi logo, exploring different visual identities.",
      images: Array.from({ length: 1 }, (_, i) => ({
        src: `/ui-stages/Stage-1/${i + 1}.jpeg`,
        alt: `Logo Suggestion ${i + 1}`
      }))
    },
    {
      id: 2,
      title: "Stage 2: Logo Development",
      description: "Refinement and development of the chosen logo concept, establishing the final brand mark.",
      images: Array.from({ length: 4 }, (_, i) => ({
        src: `/ui-stages/Stage-2/${i + 1}.jpeg`,
        alt: `Logo Development ${i + 1}`
      }))
    },
    {
      id: 3,
      title: "Stage 3: Prototype",
      description: "High-fidelity screens and interface designs for the Capsumi application.",
      images: Array.from({ length: 24 }, (_, i) => ({
        src: `/ui-stages/Stage-3/${i + 1}.jpeg`,
        alt: `Prototype Screen ${i + 1}`
      }))
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

  const downloadImage = (e: React.MouseEvent, src: string, name: string) => {
    e.stopPropagation()
    const link = document.createElement('a')
    link.href = src
    link.download = name || 'image'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadAllImages = (images: { src: string; alt: string }[]) => {
    images.forEach((img, index) => {
      setTimeout(() => {
        const link = document.createElement('a')
        link.href = img.src
        link.download = img.alt || `image-${index}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }, index * 200)
    })
  }

  // Navigation Handlers
  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedImageIndex !== null && modalContent?.images) {
      setSelectedImageIndex((prev) => (prev! + 1) % modalContent.images!.length)
    }
  }

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (selectedImageIndex !== null && modalContent?.images) {
      setSelectedImageIndex((prev) => (prev! - 1 + modalContent.images!.length) % modalContent.images!.length)
    }
  }

  // Keyboard Navigation
  useEffect(() => {
    if (selectedImageIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "Escape") setSelectedImageIndex(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImageIndex, modalContent])

  // Touch Navigation Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) handleNext()
    if (isRightSwipe) handlePrev()
    
    // Reset
    touchStartX.current = 0
    touchEndX.current = 0
  }

  // Determine current image
  const currentImage = selectedImageIndex !== null && modalContent?.images 
    ? modalContent.images[selectedImageIndex] 
    : null

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
                    images: item.images
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

      {/* Main Modal */}
      {isModalOpen && modalContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/25 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="neomorph-modal relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[1.25rem] bg-background p-6 sm:max-h-[80vh] sm:p-8"
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
            {modalContent.images && (
              <div className="mt-6 sm:mt-8">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-bold text-foreground sm:text-xl">Images:</h4>
                  <button
                    onClick={() => downloadAllImages(modalContent.images || [])}
                    className="neomorph-flat flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:neomorph-pressed hover:text-accent sm:text-sm"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download All
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {modalContent.images.map((img, index) => (
                    <div
                      key={index}
                      className="group relative cursor-pointer overflow-hidden rounded-lg border border-border"
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img src={img.src} alt={img.alt} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold bg-black/50 px-3 py-1 rounded-full">View</span>
                      </div>
                      <button
                        onClick={(e) => downloadImage(e, img.src, img.alt)}
                        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 shadow-sm transition-all hover:bg-accent hover:text-white group-hover:opacity-100"
                        title="Download Image"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
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

      {/* Lightbox Modal for Images */}
      {currentImage && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImageIndex(null)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Top Controls */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Main Image Container */}
          <div className="relative flex h-full w-full max-w-7xl items-center justify-center" onClick={(e) => e.stopPropagation()}>
            
            {/* Left Arrow (Desktop) */}
            <button 
                onClick={handlePrev}
                className="absolute left-0 z-50 hidden p-4 text-white/50 transition-colors hover:text-white md:block"
            >
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
            />

            {/* Right Arrow (Desktop) */}
            <button 
                onClick={handleNext}
                className="absolute right-0 z-50 hidden p-4 text-white/50 transition-colors hover:text-white md:block"
            >
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
          </div>

          {/* Bottom Control Bar */}
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6" onClick={(e) => e.stopPropagation()}>
            {/* Mobile Prev */}
            <button onClick={handlePrev} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md md:hidden">
               <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Counter */}
            <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                {selectedImageIndex! + 1} / {modalContent?.images?.length}
            </div>

            {/* Mobile Next */}
            <button onClick={handleNext} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md md:hidden">
               <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Download Button */}
            <button
                onClick={(e) => downloadImage(e, currentImage.src, currentImage.alt)}
                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
