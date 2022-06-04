export class CreateEmployeeDto {
  subsultion: "Mr" | "Mrs" | "Ms";

  firstname: string;

  lastname: string;

  email: string;

  gendar: "Man" | "Women";

  birthDate: Date;
}
