import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import Filters from "@/components/shared/Filters";
import { JobFilters } from "@/constants/filters";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const jobs = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Stripe",
    location: "Remote · USA",
    type: "Full-time",
    salary: "$140k – $180k",
    logo: "https://logo.clearbit.com/stripe.com",
    tags: ["React", "TypeScript", "Next.js"],
    postedAt: "2 days ago",
    link: "https://stripe.com/jobs",
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "Vercel",
    location: "Remote · Worldwide",
    type: "Full-time",
    salary: "$120k – $160k",
    logo: "https://logo.clearbit.com/vercel.com",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    postedAt: "3 days ago",
    link: "https://vercel.com/careers",
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "MongoDB",
    location: "New York, NY · Hybrid",
    type: "Full-time",
    salary: "$130k – $170k",
    logo: "https://logo.clearbit.com/mongodb.com",
    tags: ["MongoDB", "Node.js", "Go"],
    postedAt: "5 days ago",
    link: "https://www.mongodb.com/careers",
  },
  {
    id: "4",
    title: "React Native Developer",
    company: "Airbnb",
    location: "San Francisco, CA · Remote",
    type: "Full-time",
    salary: "$150k – $200k",
    logo: "https://logo.clearbit.com/airbnb.com",
    tags: ["React Native", "TypeScript", "GraphQL"],
    postedAt: "1 week ago",
    link: "https://careers.airbnb.com",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "GitHub",
    location: "Remote · Worldwide",
    type: "Full-time",
    salary: "$125k – $165k",
    logo: "https://logo.clearbit.com/github.com",
    tags: ["Kubernetes", "AWS", "Terraform"],
    postedAt: "1 week ago",
    link: "https://github.com/about/careers",
  },
  {
    id: "6",
    title: "Machine Learning Engineer",
    company: "OpenAI",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$200k – $300k",
    logo: "https://logo.clearbit.com/openai.com",
    tags: ["Python", "PyTorch", "LLMs"],
    postedAt: "2 weeks ago",
    link: "https://openai.com/careers",
  },
];

const Jobs = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Find Jobs</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/jobs"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Job Title, Company, or Keywords..."
          otherClasses="flex-1"
        />
        <Filters
          otherClasses="min-h-[56px] min-w-[170px]"
          filters={JobFilters}
        />
      </div>

      <div className="mt-10 flex flex-col gap-6">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card-wrapper flex items-start gap-6 rounded-[10px] p-8 sm:px-11 hover:opacity-90 transition-opacity"
          >
            {/* Company Logo */}
            <div className="background-light800_dark400 flex size-16 shrink-0 items-center justify-center rounded-xl p-2">
              <Image
                src={job.logo}
                alt={job.company}
                width={56}
                height={56}
                className="rounded-lg object-contain"
                onError={undefined}
              />
            </div>

            {/* Job Info */}
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="base-semibold text-dark200_light900 line-clamp-1">
                    {job.title}
                  </h3>
                  <p className="body-regular text-dark500_light500 mt-1">
                    {job.company}
                  </p>
                </div>
                <span className="background-light800_dark400 subtle-regular text-dark400_light700 rounded-full px-3 py-1">
                  {job.type}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="background-light800_dark300 text-light400_light500 subtle-regular rounded px-3 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-1">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Image
                      src="/assets/icons/location.svg"
                      alt="location"
                      width={16}
                      height={16}
                      className="invert-colors"
                    />
                    <span className="body-medium text-dark400_light700">
                      {job.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Image
                      src="/assets/icons/currency-dollar-circle.svg"
                      alt="salary"
                      width={16}
                      height={16}
                      className="invert-colors"
                    />
                    <span className="body-medium text-dark400_light700">
                      {job.salary}
                    </span>
                  </div>
                </div>
                <span className="subtle-regular text-dark400_light700">
                  {job.postedAt}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <Image
              src="/assets/icons/arrow-up-right.svg"
              alt="visit"
              width={20}
              height={20}
              className="invert-colors shrink-0"
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Jobs;
