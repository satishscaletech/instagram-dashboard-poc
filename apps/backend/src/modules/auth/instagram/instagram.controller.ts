import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { AuthRequestDto, RegisterRequestDto } from './dto/request.dto';
import { SuccessResponse } from '../../../interface';
import { authResponseDto, InstaInfoResponseDto } from './dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Instagram Auth Module')
@Controller('auth/instagram')
export class InstagramController {
    constructor(private readonly instagramService: InstagramService) {}

    @ApiOperation({ summary: 'Redirect to facebook login' })
    @Get('login')
    async login(@Res() res: Response) {
        const data = await this.instagramService.login();
        res.redirect(data.url);
    }

    @ApiOperation({ summary: 'Authorize facebook user' })
    @ApiResponse({ type: authResponseDto })
    @Post('authorize')
    async authorize(@Body() dto: AuthRequestDto): Promise<SuccessResponse<authResponseDto>> {
        const data = await this.instagramService.authorize(dto);
        return { data };
    }

    @ApiOperation({ summary: 'Register firebase user and store user instagram data' })
    @ApiResponse({ type: InstaInfoResponseDto })
    @Post('register')
    async register(
        @Body() dto: RegisterRequestDto,
    ): Promise<SuccessResponse<InstaInfoResponseDto>> {
        const data = await this.instagramService.register(dto);
        return { data };
    }
}
