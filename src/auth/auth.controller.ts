import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dot";
import { CookieGetter } from "src/decorators/cookieGetter.decorator";
import { Response } from "express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Login qilish" })
  @Post("login")
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDto, res);
  }

  // @ApiOperation({ summary: "Logout qilish" })
  // @Post("logout")
  // logout(
  //   @CookieGetter("refresh_token") refreshToken: string,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   return this.authService.logout(refreshToken, res);
  // }
}
