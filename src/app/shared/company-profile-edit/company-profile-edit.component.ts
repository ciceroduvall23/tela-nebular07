import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { promisify } from '@core/helpers/promisify'
import {
  Company,
  CompanyAccount,
  CompanyLocation,
  CompanyOwner,
  User,
} from '@core/models'
import { AuthService, CompanyService } from '@core/services'
import { NbToastrService } from '@nebular/theme'

@Component({
  selector: 'app-company-profile-edit',
  templateUrl: './company-profile-edit.component.html',
  styleUrls: ['./company-profile-edit.component.scss'],
})
export class CompanyProfileEditComponent implements OnInit {
  @Input() user: User
  company: Company
  form: FormGroup
  imageForm: FormGroup
  loading = false

  get controls() {
    return this.form.controls as { [key: string]: FormControl }
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: NbToastrService,
    private service: CompanyService
  ) {}

  ngOnInit(): void {
    if (!this.user.company) {
      this.toastr.danger(
        'Entre em contato com o suporte',
        'Algo não ocorreu como esperado'
      )
      throw new Error(`user.company is ${this.user.company}`)
    }

    this.company = this.user.company as Company
    this.imageForm = this.formBuilder.group({
      image: [this.company.image || '', [Validators.required]],
      companyId: [this.company.id, [Validators.required]],
    })
    this.form = this.formBuilder.group({
      id: [this.company.id, Validators.required],
      subsidiaryId: [this.company.subsidiaryId, Validators.required],
      categoryId: [this.company?.categoryId?.toString()],
      typeId: [this.company.typeId.toString(), Validators.required],
      name: [this.company.name, Validators.required],
      legalName: [this.company.legalName, Validators.required],
      phoneNumber: [this.company.phoneNumber, Validators.required],
      address: [this.company.address, Validators.required],
      district: [this.company.district, Validators.required],
      number: [this.company.number, Validators.required],
      complement: [this.company.complement],
      zipCode: [this.company.zipCode, Validators.required],
      ein: [this.company.ein, [Validators.minLength(11), Validators.maxLength(18)]],
      tax: [this.company.tax, [Validators.required]],
      issueFiscalDocument: [this.company.issueFiscalDocument],
      hasPickUp: [this.company.hasPickUp],
      isOpen: [this.company.isOpen],
      isActive: [this.company.isActive],
      packageId: [this.company.packageId],
      stateId: [parseInt(this.company.stateId as string), Validators.required],
      cityId: [parseInt(this.company.cityId as string), Validators.required],
      latitude: [
        (this.company.location as CompanyLocation).coordinates.latitude,
        [Validators.required, Validators.min(-90), Validators.max(90)],
      ],
      longitude: [
        (this.company.location as CompanyLocation).coordinates.longitude,
        [Validators.required, Validators.min(-180), Validators.max(180)],
      ],
      owner: this.formBuilder.group({
        name: [(this.company.owner as CompanyOwner).name, Validators.required],
        ssn: [
          (this.company.owner as CompanyOwner).ssn,
          [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
        ],
        phoneNumber: [
          (this.company.owner as CompanyOwner).phoneNumber,
          Validators.required,
        ],
      }),
      account: this.formBuilder.group({
        bank: [
          (this.company.account as CompanyAccount).bank.toString(),
          Validators.required,
        ],
        agency: [(this.company.account as CompanyAccount).agency, Validators.required],
        number: [(this.company.account as CompanyAccount).number, Validators.required],
        digit: [(this.company.account as CompanyAccount).digit],
        type: [(this.company.account as CompanyAccount).type?.toString()],
        person: [
          (this.company.account as CompanyAccount).person.toString(),
          Validators.required,
        ],
        einssn: [(this.company.account as CompanyAccount).einssn, Validators.required],
      }),
      hours: this.formBuilder.array([]),
      shippingType: [this.company.shippingType.toString(), Validators.required],
      shippingTax: [
        {
          disabled: this.company.shippingType == 1,
          value: this.company.shippingTax.toString(),
        },
      ],
      minOrderValue: [this.company.minOrderValue, Validators.required],
      avgMinTime: [this.company.avgMinTime, Validators.required],
      avgMaxTime: [this.company.avgMaxTime, Validators.required],
    })
  }

  imageChanged(file: File | string) {
    this.imageForm.controls.image.setValue(file)
    this.imageForm.markAsDirty()
  }

  async submitForm() {
    try {
      if (this.form.valid && !this.loading) {
        this.loading = true
        if (!this.imageForm.pristine && this.imageForm.valid) {
          const imageFormData = this.convertModelToFormData(this.imageForm.value)
          const image = await promisify(this.service.addImage(imageFormData))
        }
        const company = await promisify(this.service.edit(this.form.value))
        this.authService.loadUserFromLocalStorageAndUpdateItsData() // update user/company cache
        this.loading = false
        this.toastr.success('', 'Estabelecimento atualizado com sucesso')
      }
    } catch (error) {
      this.loading = false
      console.error(error)
    }
  }

  private convertModelToFormData(
    data: { [key: string]: any } = {},
    form?: FormData,
    namespace = ''
  ) {
    let files: { [key: string]: any } = {}
    let model: { [key: string]: any } = {}
    for (let propertyName in data) {
      if (data.hasOwnProperty(propertyName) && data[propertyName] instanceof File) {
        files[propertyName] = data[propertyName]
      } else {
        model[propertyName] = data[propertyName]
      }
    }

    // model = JSON.parse(JSON.stringify(model));
    let formData = form || new FormData()

    for (let propertyName in model) {
      if (!model.hasOwnProperty(propertyName) || !model[propertyName]) continue
      let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName
      if (model[propertyName] instanceof Date)
        formData.append(formKey, model[propertyName].toISOString())
      else if (model[propertyName] instanceof File) {
        formData.append(formKey, model[propertyName])
      } else if (model[propertyName] instanceof Array) {
        model[propertyName].forEach((element: any, index: any) => {
          const tempFormKey = `${formKey}[${index}]`
          if (typeof element === 'object')
            this.convertModelToFormData(element, formData, tempFormKey)
          else formData.append(tempFormKey, element.toString())
        })
      } else if (
        typeof model[propertyName] === 'object' &&
        !(model[propertyName] instanceof File)
      )
        this.convertModelToFormData(model[propertyName], formData, formKey)
      else {
        formData.append(formKey, model[propertyName].toString())
      }
    }

    for (let propertyName in files) {
      if (files.hasOwnProperty(propertyName)) {
        formData.append(propertyName, files[propertyName])
      }
    }
    return formData
  }
}
