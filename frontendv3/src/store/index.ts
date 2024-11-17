
// 项目的读写
class ProjectStorage {

  public setProject(projectId: number, projectName: string): void {
    const project = { id: projectId, name: projectName };
    sessionStorage.setItem('currentProject', JSON.stringify(project));
  }

  public getProject(): { id?: number, name?: string } | null {
    const projectDataJSON = sessionStorage.getItem('currentProject');
    if (projectDataJSON) {
      const projectData = JSON.parse(projectDataJSON);
      return projectData;
    }
    return null;
  }
}

// 创建一个单例实例，方便全局使用
const projectStorage = new ProjectStorage();

export default projectStorage;
