export class NavbarPresenter {
  SUPER_USER: string;

  // Normal signature with defaults
  constructor(superUser: string) {
    this.SUPER_USER = superUser;
  }

  userProfile(email: string | null | undefined) {
    if (email === this.SUPER_USER) {
      return 'admin';
    } else if (email?.length && email !== this.SUPER_USER) {
      return 'client';
    }
    if (!email?.length) {
      return 'visitor';
    }
  }
}
