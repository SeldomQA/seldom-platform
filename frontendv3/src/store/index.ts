import { createStore } from 'vuex';

export const store = createStore({
  state: {
    currentProject: null as {  // 存储整个项目对象
      id: number;
      name: string;
      address: string;
      case_dir: string;
      is_delete: boolean;
      create_time: string;
      update_time: string;
      cover_name: string;
      path_name: string;
      test_num: number;
      is_clone: number;
      run_version: string;
    } | null,
  },
  mutations: {
    setCurrentProject(state, project: any) {
      state.currentProject = project;
    },
  },
  actions: {
    setCurrentProject({ commit }, project: any) {
      commit('setCurrentProject', project);
    },
  },
});
