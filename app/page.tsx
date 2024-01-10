import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="z-10 w-full max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-8 text-blue-600 dark:text-blue-400">
          Welcome to the SQL Learning Centre!
        </h1>
        <p className="mb-4">
          This is for you if you want to learn SQL. It starts from the very
          basics and finishes with being able to tackle almost any SQL query
          problem. I make no assumptions about any past programming experience
          you may have.
        </p>
        <p className="mb-4">
          I created this course because I have strong opinions about how to
          learn SQL. My learning journey was unnecessarily long and frustrating,
          and I wanted to create something that eliminated all the frustrations
          and made learning SQL as easy and fast as it could be.
        </p>
        <h2 className="text-2xl font-bold mb-2">Teach what is needed</h2>
        <p className="mb-4">
          All information presented is essential to writing SQL and there are no
          irrelevant details. Let me be very clear about the purpose of this
          course. It is to learn to write advanced SQL queries. It is not to
          teach theory, technical jargon, history, or big picture ideas. We get
          straight to the point and start writing.
        </p>
        <p className="mb-4">
          When I was a beginner, I did not have enough knowledge to figure out
          what was essential to know and what wasn&apos;t. I overconsumed and
          forgot most of it because it was irrelevant.
        </p>
        <p className="mb-4">
          If you want to learn these other things, that&apos;s fine. There are
          great resources for this, and you&apos;ll be in a good position after
          completing this course. It&apos;s just not needed to write SQL.
        </p>
        <h2 className="text-2xl font-bold mb-2">Practice is the only way</h2>
        <p className="mb-4">
          You can&apos;t learn this skill by consuming tutorials, doesn&apos;t
          matter how good they are. You have to actually write SQL to learn to
          write SQL.
        </p>
        <p className="mb-4">
          So most of the course content is real practice questions. You can
          solve all of them live from your browser.
        </p>
        <p className="mb-4">
          There are no long pages of info with a whole lot of concepts thrown at
          you at once. Only one small concept is explained at a time. To ensure
          mastery, it is immediately reinforced through directly relevant
          practice before moving on.
        </p>
        <h2 className="text-2xl font-bold mb-2">Perfect ordering</h2>
        <p className="mb-4">
          If I ask you to say &quot;Go for a walk and buy those items&quot; in a
          language you don&apos;t know, you first need to know how to say
          &quot;Go for a walk&quot; and &quot;Buy those items&quot; separately.
        </p>
        <p className="mb-4">
          There is no point in me asking you to say the whole sentence if you
          don&apos;t know the components. All SQL questions can be broken down
          into components that need to be solved, then combined together. If you
          understand all the components, no question is truly hard because it
          can always be broken down to easy components.
        </p>
        <p className="mb-4">
          If you can&apos;t solve an SQL question, it&apos;s because you either
          don&apos;t know at least one of the components or you haven&apos;t
          practiced enough to recognise when it is needed. That&apos;s all.
        </p>
        <p className="mb-4">
          If you go though this course in order, you will learn each simple
          component separately, then have practice combining them. There will
          never be a point where you get stuck or frustrated because the
          questions build on each other perfectly. Even the later
          &quot;hard&quot; questions.
        </p>
        <h2 className="text-2xl font-bold mb-2">Instructions:</h2>
        <p className="mb-4">
          Go through the course in order. Read the tutorials and do the practice
          questions that follow. These questions require you to write real SQL
          in the code editor on the webpage, then submit them for feedback. They
          are checked by a machine and you are told if they are correct or not.
          If they are incorrect, you will be provided with feedback so you know
          why. Try until you are correct. You must solve the questions before
          moving onto the next. They build on each other.
        </p>
        <p className="mb-4">Have fun learning!</p>
        <div className="flex justify-center mt-12">
          <Link
            href="/course/SQL%20Basics/1"
            className="inline-flex items-center justify-center bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg hover:bg-blue-600 dark:hover:bg-blue-700 hover:scale-105 transition-transform duration-300 text-sm md:text-base"
          >
            <span className="font-semibold">Start Now</span>
          </Link>
        </div>
        <p className="text-center mt-12 font-medium">Developed by Edward Gauld</p>
      </div>
    </main>
  );
}
