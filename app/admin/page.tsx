import React from 'react';
import DashboardCard from './components/DashboardCard';

const page = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <DashboardCard
          title="Questions"
          description="Manage questions"
          link="admin/questions"
        />

        <DashboardCard
          title="Lessons"
          description="Manage lessons"
          link="admin/lessons"
        />

        <DashboardCard
          title="Course"
          description="Manage courses"
          link="admin/course"
        />

        <DashboardCard
          title="Modules"
          description="Create and edit modules"
          link="admin/modules"
        />

        {/* <DashboardCard title="Skills" description='Manage skils' link='admin/questions/create'/> */}
      </div>
    </div>
  );
};

export default page;
