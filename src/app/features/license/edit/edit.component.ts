import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { License, LicenseService } from '../license.service';

@Component({
  selector: 'n-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  properties = [
    'producer',
    'title',
    'copyright',
    'administrator',
    'contracted_percentage',
    'audiovisual_production_title',
    'sync_type',
    'sync_price',
    'location',
  ];

  licenseForm!: FormGroup;

  entity!: License;

  get hasEntity(): boolean {
    return Boolean(this.entity);
  }

  get titlePrefix(): string {
    return this.hasEntity ? 'Editar' : 'Criar';
  }

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private licenseService: LicenseService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.licenseForm = this.formBuilder.group({
      id: null,
      producer: null,
      title: null,
      copyright: null,
      administrator: null,
      contracted_percentage: null,
      audiovisual_production_title: null,
      sync_type: null,
      sync_price: null,
      location: null,
    });

    this.activatedRoute.data.subscribe(({ entity }) => {
      this.entity = entity;
      this.licenseForm.patchValue(this.entity);
    });
  }

  save() {
    if (this.licenseForm.valid) {
      const action = this.hasEntity
        ? this.licenseService.update(
            this.licenseForm.value.id,
            this.licenseForm.value,
          )
        : this.licenseService.create(this.licenseForm.value);

      action.subscribe(() => {
        this.router.navigate(['../list']);
      });
    }
  }
}
