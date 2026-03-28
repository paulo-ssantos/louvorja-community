import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Returns current user' })
  async getCurrentUser(@Body('userId') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user profile by ID' })
  @ApiResponse({ status: 200, description: 'Returns the user profile' })
  async getProfile(@Param('id') id: string) {
    return this.usersService.getProfile(id);
  }

  @Get(':id/collections')
  @ApiOperation({ summary: 'Get user collections' })
  @ApiResponse({ status: 200, description: 'Returns user collections' })
  async getUserCollections(@Param('id') id: string) {
    return this.usersService.getUserCollections(id);
  }

  @Put('me')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated' })
  async updateProfile(@Body() updateUserDto: any) {
    return this.usersService.updateProfile(updateUserDto);
  }
}
