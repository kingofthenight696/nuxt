import Vue from 'vue';
 import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Comment from '@/components/Comment/Comment.vue'
import { mount } from '@vue/test-utils'

Vue.use(Vuetify);

describe('Comment.test.js', () => {
    let cmp;

    describe('Properties', () => {

        const createCmp = propsData => mount(Comment, { propsData });

        it('comment property is exist', () => {
            cmp = createCmp({ comment: {
                    rating: 4,
                    comment: 'test',
                    user: {
                        id: 1,
                        name: 'Alex',
                        email: 'test@test.com',
                    }} });

            expect(cmp.props().comment).toStrictEqual({
                rating: 4,
                comment: 'test',
                user: {
                    id: 1,
                    name: 'Alex',
                    email: 'test@test.com',
                }});
        });


        it('not included property is undedeined', () => {
            cmp = createCmp({ cat: 'hey', comment: {
                    rating: 4,
                    comment: 'test',
                    user: {
                        id: 1,
                        name: 'Alex',
                        email: 'test@test.com',
                    }}});
            expect(cmp.props().cat).toBeUndefined();
        });

        describe('Properties types', () => {
            const comment = createCmp({comment: {
                    rating: 4,
                    comment: 'test',
                    user: {
                        id: 1,
                        name: 'Alex',
                        email: 'test@test.com',
                    }}}).vm.$options.props.comment;

            it('Comment property is a object', () => {
                expect(comment.type).toBe(Object);
            });

            it('Comment property is required', () => {
                expect(comment.required).toBeTruthy();
            });

            it('Comment comment property must be a string', () => {
                expect(comment.comment.type).toBe(String);
            });

            it('Comment rating property must be a number', () => {
                expect(comment.rating.type).toBe(Number);
            });

        });

    });
});