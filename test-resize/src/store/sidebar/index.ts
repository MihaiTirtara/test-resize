import { Module } from 'vuex';
import { GetterTree } from 'vuex';
import { ActionTree } from 'vuex';
import { MutationTree } from 'vuex';
import axios from 'axios';

const state: any = {
    sidebar: {} as any
};

const getters: GetterTree<any, any> = {};

const actions: ActionTree<any, any> = {
    fetchData({ commit }): any {

        const sidebar = {
            items: [
                {
                    "height": 100,
                    "image_url": "https://picsum.photos/id/1001/200/300",
                    "name": "foo11",
                    "product_id": "1",
                    "width": 100
                },
                {
                    "height": 100,
                    "image_url": "https://picsum.photos/id/1002/200/300",
                    "name": "foo12",
                    "product_id": "2",
                    "width": 100
                },
                {
                    "height": 100,
                    "image_url": "https://picsum.photos/id/1003/200/300",
                    "name": "foo13",
                    "product_id": "3",
                    "width": 100
                },

            ]
        }

        let payload = {
            obj: sidebar
        }

        commit('setSidebar', payload);

    },
    moveProduct({ commit }, { oldIndex, newIndex }): any {
        commit('reorderList', { oldIndex, newIndex });
    },

    removeProduct({ commit }, { index }): any {
        commit('removeItem', { index });
    }
};

const mutations: MutationTree<any> = {
    setSidebar(state, payload: any) {
        state.sidebar = payload.obj;
    },

    reorderList(state, { oldIndex, newIndex }: any) {
        state.sidebar.items.splice(
            newIndex,
            0,
            state.sidebar.items.splice(oldIndex, 1)[0]
        );
    },
    removeItem(state, { index }: any) {
        state.sidebar.items.splice(index, 1);
    }
};

export const sidebar: Module<any, any> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
