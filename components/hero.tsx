import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

export default function Hero() {
  return (
    <>
      <Head>
        <title>frontforumfocus - Sustainability Data Management Software | ESG Reporting Platform</title>
        <meta name="description" content="Empower your organization with frontforumfocus, the leading sustainability software platform. Track ESG metrics, generate CSR reports, and drive positive impact." />
        <meta name="keywords" content="sustainability software, ESG software platform, CSR reporting software, sustainability reporting platform" />
      </Head>
      <section className="flex flex-col md:flex-row bg-gradient-to-br from-[#e6f7f1] to-[#ffd5e5]">
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a5c45] mb-6">
            Revolutionize Your Sustainability Management
          </h1>
          <p className="text-[#0a5c45] mb-8 max-w-md text-lg">
            frontforumfocus: The all-in-one ESG software platform for real-time impact tracking, CSR reporting, and data-driven sustainability decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/impact"
              className="bg-[#7cb342] text-white py-3 px-6 rounded-full text-center hover:bg-[#6a9c39] transition-colors font-semibold"
            >
              Get a Free Demo
            </Link>
            <Link
              href="/about"
              className="border-2 border-[#0a5c45] text-[#0a5c45] py-3 px-6 rounded-full text-center hover:bg-[#0a5c45] hover:text-white transition-colors font-semibold"
            >
              Learn More
            </Link>
          </div>
          <div className="mt-8 text-sm text-[#0a5c45]">
            Trusted by leading NGOs and sustainability-focused organizations
          </div>
        </div>
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="relative w-full max-w-[400px] aspect-[9/16]">
            <Image
              src="/Discover.png"
              alt="frontforumfocus sustainability dashboard on smartphone and desktop"
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>
    </>
  )
}