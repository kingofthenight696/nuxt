import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import ButtonAddToCart from '@/components/Control/ButtonAddToCart.vue'
import { mount } from '@vue/test-utils'
import VueTestUtils from '@vue/test-utils'

VueTestUtils.config.mocks['errors'] = {};

Vue.use(Vuetify);

describe('ButtonAddToCart.test.js', () => {
    let cmp;

    describe('Properties', () => {

        const createCmp = propsData => mount(ButtonAddToCart, { propsData });

        it('Property product is exist', () => {
            cmp = createCmp({ product: {
                price: 111
                }});

            expect(cmp.props().value).toStrictEqual({
                price: 111
            });
        });


        describe('Properties types', () => {
            const comment = createCmp({product: {
                    price: 111
                }}).vm.$options.props.product;

            it('Product property is a object', () => {
                expect(product.type).toBe(Object);
            });

            it('Product property is required', () => {
                expect(product.required).toBeTruthy();
            });

            it('Product id property must be a number', () => {
                expect(product.id).toBe(Number);
            });

        });
        describe('События', () => {
            beforeEach(() => {
                cmp = createCmp({ message: 'Cat' });
            });

            it('вызывается handleClick после клика на сообщение', () => {

                window.open = jest.fn(); // global function mock to stop actual from executing
                wrapper.vm.isExistInCart = jest.fn();
                const searchBtn = '.add-to-cart';
                wrapper.find(searchBtn).trigger('click');
                expect(wrapper.vm.isExistInCart).toBeCalled();
            });
        })
    });

});
