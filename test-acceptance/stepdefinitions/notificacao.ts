import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
defineSupportCode(function ({ Given, When, Then }) {

    Given(/^Estou na página "Entregas Disponíveis"$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('EntregadoresGui');
        await $("a[name='entregas_disponiveis']").click();
    })
    
    Given(/^Existe uma nova entrega do restaurante "([^\"]*)" para o endereço "([^\"]*)" com lucro de "(\d*)" reais, tempo de preparo de "(\d*)" minutos e de id "(\d*)"$/, async (restaurante, endereco, lucro, tempo_preparo, id) => {
        expect((await element.all(by.id(`entrega-${restaurante}-${endereco}-${lucro}-${tempo_preparo}-${id}`))).length).to.equal(1);
    })

    When(/^Aperto o botão de aceitar a entrega de id "(\d*)"$/, async (id) => {
        await element(by.id(`aceitar_entrega-${id}`)).click();
    })

    Then(/^A entrega do restaurante "([^\"]*)" para o endereço "([^\"]*)" com lucro de "(\d*)" reais, tempo de preparo de "(\d*)" minutos e de id "(\d*)" não está mais na lista$/, async (restaurante, endereco, lucro, tempo_preparo, id) => {
        expect((await element.all(by.id(`entrega-${restaurante}-${endereco}-${lucro}-${tempo_preparo}-${id}`))).length).to.equal(0);
    })


    Given(/^Estou na página "Minhas Entregas"$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('EntregadoresGui');
        await $("a[name='minhas_entregas']").click();
    })

    Given(/^Uma entrega do restaurante "([^\"]*)" e de id "(\d*)" está ativa$/, async (restaurante, id) => {
        expect((await element.all(by.id(`entrega_ativa-${restaurante}-${id}`))).length).to.equal(1);
    })
    
    When(/^Finalizo a entrega de id "(\d*)"$/, async (id) => {
        await element(by.id(`finalizar_entrega-${id}`)).click();
    })

    Then(/^A entrega do restaurante "([^\"]*)" e de id "(\d*)" continua nas entregas ativas$/, async (restaurante, id) => {
        expect((await element.all(by.id(`entrega_ativa-${restaurante}-${id}`))).length).to.equal(1);
    })
    
    Then(/^A entrega do restaurante "([^\"]*)" e de id "(\d*)" é adicionada à lista de entregas finalizadas$/, async (restaurante, id) => {
        expect((await element.all(by.id(`entrega_finalizada-${restaurante}-${id}`))).length).to.equal(1);
    })

    Given(/^Uma entrega do restaurante "([^\"]*)", com lucro de "(\d*)" reais e de id "(\d*)" está ativa$/, async (restaurante, lucro, id) => {
        expect((await element.all(by.id(`entrega_ativa_lucro-${restaurante}-${id}-${lucro}`))).length).to.equal(1);
    })

    Given(/^Possuo uma entrega do restaurante "([^\"]*)" e de id "(\d*)" finalizada, com lucro de "(\d*)" reais$/, async (restaurante, id, lucro) => {
        expect((await element.all(by.id(`entrega_finalizada_lucro-${restaurante}-${id}-${lucro}`))).length).to.equal(1);
    })

    Given(/^Só possuo "(\d*)" entregas finalizadas$/, async (quant) => {
        expect((await element.all(by.id(`item_finalizado`))).length).to.equal(quant);
    })

    Then(/^O valor de lucro total é apresentado, que será igual a "(\d*)" reais$/, async (lucro) => {
        expect((await element.all(by.id(`lucro_total-${lucro}`))).length).to.equal(1);
    })
    

})