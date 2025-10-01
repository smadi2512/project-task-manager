import { useState } from "react";
import NewProject from "./components/Project/NewProject";
import NoProjectSelected from "./components/Project//NoProjectSelected";
import ProjectsSidebar from "./components/Sidebar/ProjectsSidebar";
import SelectedProject from "./components/Project/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState(
    {
      projectSelectedId: undefined,
      projects: [],
      tasks: []
    }
  );

  //All the functions related to manipulate with project itself.
  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        projectSelectedId: null
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      };

      return {
        ...prevState,
        projectSelectedId: undefined,
        projects: [...prevState.projects, newProject]
      }
    });
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        projectSelectedId: undefined
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        projectSelectedId: id
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        projectSelectedId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.projectSelectedId),
      };
    });
  }

  //All the functions related to manipulate with tasks inside a certain project.
  function handleAddTask(text) {
    setProjectsState(prevState => {
      const taskId = Math.random();

      const newTask = {
        text: text,
        projectId: prevState.projectSelectedId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      }
    });
  }

  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      };
    });
  }

  let content;

  const selectedProject = projectsState.projects.find((project) => project.id === projectsState.projectSelectedId);

  let selectedProjectTasks = [];
  selectedProjectTasks = selectedProjectTasks = projectsState.tasks.filter((task) => task.projectId === projectsState.projectSelectedId);

  if (projectsState.projectSelectedId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  }
  else if (projectsState.projectSelectedId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }
  else {
    content = <SelectedProject project={selectedProject} tasks={selectedProjectTasks} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask}/>;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.projectSelectedId}
      />
      {content}
    </main>
  );
}

export default App;
