Feature: Notificação de entregas
    As a Entregador
    I want to Ser notificado e acompanhar minhas entregas
    So that Eu consiga realizar as entregas

Scenario: Aceitar uma entrega recebida
Given Estou na página "Entregas Disponíveis"
And Existe uma nova entrega do restaurante "Mc Donalds" para o endereço "Rua do Futuro, 199" com lucro de "15" reais, tempo de preparo de "45" minutos e de id "1"
When Aperto o botão de aceitar a entrega de id "1"
Then A entrega do restaurante "Mc Donalds" para o endereço "Rua do Futuro, 199" com lucro de "15" reais, tempo de preparo de "45" minutos e de id "1" não está mais na lista

Scenario: Finalização de uma entrega ativa
Given Estou na página "Minhas Entregas"
And Uma entrega do restaurante "Mc Donalds" e de id "1" está ativa
And Uma entrega do restaurante "Zio" e de id "2" está ativa
When Finalizo a entrega de id "1"
Then A entrega do restaurante "Zio" e de id "2" continua nas entregas ativas
And A entrega do restaurante "Mc Donalds" e de id "1" é adicionada à lista de entregas finalizadas

Scenario: Visualização de lucro total
Given Estou na página "Minhas Entregas"
And Possuo uma entrega do restaurante "Mc Donalds" e de id "1" finalizada, com lucro de "15" reais
And Uma entrega do restaurante "Zio", com lucro de "10" reais e de id "2" está ativa
And Só possuo "1" entregas finalizadas
When Finalizo a entrega de id "2"
Then O valor de lucro total é apresentado, que será igual a "25" reais

Scenario: Cadastrando uma entrega a um entregador
Given Existe uma entrega do restaurante "Zio" de id "2" disponível 
And Existe um entregador chamado "Vicente da Silva" de id "0"
When O entregador "Vicente da Silva" aceita a entrega do restaurante "Zio"
Then A entrega do restaurante "Zio", de id "2", têm o campo "entregador_id" modificado para o id do entregador, "0"
And O campo "is_ativa" da entrega se torna "true"

Scenario: Finalização de uma entrega por um entregador
Given Existe um entregador chamado "Vicente da Silva" de id "0"
And Existe uma entrega do restaurante "Zio" de id "2" cadastrada para o entregador de id "0"
When O entregador finaliza a entrega
Then O campo "is_ativa" da entrega se torna "false"

