import { UserRole } from './user-role.model';
import { UserAccount } from './user-account.model';
export class UserAccountInfo extends UserAccount {
  private id: string;
  private fullname: string;
  private avatar: string;
  private balance: number;
  private email: string;
  private phone: string;
  private createdDate: Date;
  private updatedDate: Date;
  private roles: UserRole[];
  private enabled: boolean;
  private active: boolean;
  private authorities: any; //Authorities only temp varieble
  private accountNonLocked: boolean;
  private accountNonExpired: boolean;
  private credentialsNonExpired: boolean;

  constructor() {
    super('username', '');
    this.id = '';
    this.fullname = '';
    this.avatar = '';
    this.balance = 0;
    this.email = '';
    this.phone = '';
    this.createdDate = new Date();
    this.updatedDate = new Date();
    this.roles = [];
    this.enabled = false;
    this.active = false;
    this.authorities = false;
    this.accountNonLocked = false;
    this.accountNonExpired = false;
    this.credentialsNonExpired = false;
  }
}
