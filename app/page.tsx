import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex-col">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the SQL learning centre!
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
          what was essential to know and what wasn't. I overconsumed and forgot
          most of it because it was irrelevant.
        </p>
        <p className="mb-4">
          If you want to learn these other things, that's fine. There are great
          resources for this, and you'll be in a good position after completing
          this course. It's just not needed to write SQL.
        </p>
        <h2 className="text-2xl font-bold mb-2">Practice is the only way</h2>
        <p className="mb-4">
          You can't learn this skill by consuming tutorials, doesn't matter how
          good they are. You have to actually write SQL to learn to write SQL.
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
          If I ask you to say "Go for a walk and buy those items" in a language
          you don't know, you first need to know how to say "Go for a walk" and
          "Buy those items" separately.
        </p>
        <p className="mb-4">
          There is no point in me asking you to say the whole sentence if you
          don't know the components. All SQL questions can be broken down into
          components that need to be solved, then combined together. If you
          understand all the components, no question is truly hard because it
          can always be broken down to easy components.
        </p>
        <p className="mb-4">
          If you can't solve an SQL question, it's because you either don't know
          at least one of the components or you haven't practiced enough to
          recognise when it is needed. That's all.
        </p>
        <p className="mb-4">
          If you go though this course in order, you will learn each simple
          component separately, then have practice combining them. There will
          never be a point where you get stuck or frustrated because the
          questions build on each other perfectly. Even the later "hard"
          questions.
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
        <div className="flex justify-center">
          <Link
            href="/course/SQL%20Basics/1"
            type="button"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-colors duration-200"
          >
            START NOW
          </Link>
        </div>
        <p className="mt-8">Developed by Edward Gauld</p>
      </div>
    </main>
  );
}
