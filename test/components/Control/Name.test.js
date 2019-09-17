import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Name from '@/components/Control/Name.vue'
import { mount } from '@vue/test-utils'
import VueTestUtils from '@vue/test-utils'

VueTestUtils.config.mocks['errors'] = {};

Vue.use(Vuetify);

describe('Name.test.js', () => {
    let cmp;

    describe('Properties', () => {

        const createCmp = propsData => mount(Name, { propsData });

        it('Property value is exist', () => {
            cmp = createCmp({ value: 'value'});

            expect(cmp.props().value).toStrictEqual('value');
        });

        it('Property value by default is empty string', () => {
            cmp = createCmp();
            expect(cmp.props().value).toStrictEqual('');
        });

        describe('Properties types', () => {
            const value = createCmp({value: 'test message'}).vm.$options.props.value;

            it('Properties type value is string', () => {
                expect(value.type).toBe(String);
            });
        });

//         describe('Events', () => {
//             beforeEach(() => {
//                 cmp = createCmp({ value: 'test' });
//             });
//
//             it('nameChanging method called after input', () => {
//                 const spy = spyOn(cmp.vm, 'nameChanging');
// // cmp.update() // Не требуется с vue-test-utils версии 1.0.0-beta.12
//
//                 const el = cmp.find('v-text-field').trigger('change');
//                 expect(cmp.vm.nameChanging).toBeCalled();
//
//             });
//         });
    });

});