import { Module } from 'vuex';
import { GetterTree } from 'vuex';
import { ActionTree } from 'vuex';
import { MutationTree } from 'vuex';

const state: any = {
    board: {} as any
};

const getters: GetterTree<any, any> = {
    getBoard(state) {
        return state.board;
    }
};

const actions: ActionTree<any, any> = {
    fetchData({ commit }): any {

        const board = {

            "board_number": "1",
            "top": [
                {
                    "height": 100,
                    "name": "foo1",
                    "image_url": "https://picsum.photos/id/1/200/300",
                    "product_id": "1",
                    "width": 100
                },
                {
                    "height": 100,
                    "name": "foo2",
                    "image_url": "https://picsum.photos/id/0/200/300",
                    "product_id": "5",
                    "width": 100
                }
            ],
            "center": [
                {
                    "height": 100,
                    "name": "foo3",
                    "image_url": "https://picsum.photos/id/10/200/300",
                    "product_id": "4",
                    "width": 100
                }
            ],
            "bottom": [
                {
                    "height": 100,
                    "name": "foo4",
                    "image_url": "https://picsum.photos/id/100/200/300",
                    "product_id": "9",
                    "width": 100
                }
            ]

        }
        let payload = {
            obj: board
        }
        commit('setBoard', payload);

    },
    moveImage({ commit }, { newTile, obj }): any {
        commit('addItem', { newTile, obj });
    },

    removeImage({ commit }, { originalTile, objID }): any {
        commit('removeItem', { originalTile, objID });
    }
};

const mutations: MutationTree<any> = {
    setBoard(state, payload: any) {
        console.log(payload);
        state.board = payload.obj;
    },

    removeItem(state, { originalTile, objID }: any) {
        console.log(originalTile);
        console.log(objID);
        //find index
        let products = state.board[originalTile];
        products.forEach((value: any, index: any) => {
            if (value.product_id == objID) products.splice(index, 1);
        });

        console.log('This is the length in the original tile ' + products.length);
    },

    addItem(state, { newTile, obj }: any) {
        //add element to array
        let products = state.board[newTile];
        products.push(obj);

        //state.board[newTile] = [...products];

        //console.log(state.board[newTile]);

        //console.log('This is the length in the new  tile ' + products.length);
    }
};

export const board: Module<any, any> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
