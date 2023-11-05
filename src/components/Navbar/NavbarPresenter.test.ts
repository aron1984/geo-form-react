import { describe, expect } from "@jest/globals";
import { NavbarPresenter } from "./NavbarPresenter";

describe("Test Presenter", () => {
  it('debería devolver "admin" para el usuario superadmin', () => {
    const emailTest = "ronconialejandro@gmail.com";
    const presenter = new NavbarPresenter(superUser);
    const profile = presenter.userProfile(emailTest);
    expect(profile).toBe("admin");
  });

  it('debería devolver "client" para el usuario superadmin', () => {
    const emailTest = "client@example.com";
    const presenter = new NavbarPresenter(superUser);
    const profile = presenter.userProfile(emailTest);
    expect(profile).toBe("client");
  });

  it('debería devolver "visitor" para el usuario con email vacio', () => {
    const emailTest = "";
    const presenter = new NavbarPresenter(superUser);
    const profile = presenter.userProfile(emailTest);
    expect(profile).toBe("visitor");
  });

  it('debería devolver "visitor" para el usuario sin email', () => {
    const emailTest = null;
    const presenter = new NavbarPresenter(superUser);
    const profile = presenter.userProfile(emailTest);
    expect(profile).toBe("visitor");
  });

  const superUser = 'ronconialejandro@gmail.com'
}); 

