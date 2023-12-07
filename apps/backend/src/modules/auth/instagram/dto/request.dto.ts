import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthRequestDto {
    @ApiProperty({ default: '' })
    @IsNotEmpty()
    @IsString()
    access_token!: string;

    @ApiPropertyOptional({ default: '' })
    @IsOptional()
    @IsString()
    long_lived_token!: string;

    @ApiPropertyOptional({ default: '' })
    @IsOptional()
    data_access_expiration_time?: string;

    @ApiPropertyOptional({ default: '' })
    @IsOptional()
    expires_in?: string;
}

export class RegisterRequestDto {
    @ApiProperty({ default: '' })
    @IsNotEmpty()
    @IsString()
    access_token!: string;

    @ApiPropertyOptional({ default: '' })
    @IsOptional()
    @IsString()
    long_lived_token!: string;

    @ApiProperty({ default: '' })
    @IsNotEmpty()
    @IsString()
    id_token!: string;
}
