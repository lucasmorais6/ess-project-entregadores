import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEntregaComponent } from './registrar_entrega.component';

describe('RegistrarEntregasComponent', () => {
  let component: RegistrarEntregaComponent;
  let fixture: ComponentFixture<RegistrarEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent( RegistrarEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
