import Image from 'next/image'
import Link from 'next/link'
export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row">
      <div className="flex-1 bg-[#e6f7f1] p-8 md:p-16 flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a5c45] mb-6">
          Track Your Impact Today
        </h1>
        <p className="text-[#0a5c45] mb-8 max-w-md">
          Our platform empowers individuals and businesses to measure sustainability metrics and track their positive impact on the environment and society.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/impact"
            className="bg-[#7cb342] text-white py-3 px-6 rounded-full text-center hover:bg-[#6a9c39] transition-colors"
          >
            Start Tracking Now
          </Link>
          <Link
            href="/about"
            className="border-2 border-[#0a5c45] text-[#0a5c45] py-3 px-6 rounded-full text-center hover:bg-[#0a5c45] hover:text-white transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-[#ffd5e5] p-8 flex items-center justify-center">
        <div className="relative w-full max-w-[300px] aspect-[9/19.5]">
          <Image
            src="/Discover.png?height=667&width=375"
            alt="Smartphone showing green hills with wind turbines"
            layout="fill"
            objectFit="contain"
            className="rounded-[2rem]"
          />
        </div>
      </div>
    </section>
  )
}