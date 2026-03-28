import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeveloperService } from './developer.service';

@ApiTags('developer')
@Controller('developer')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Get('projects')
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Returns all projects' })
  async findAll() {
    return this.developerService.findAll();
  }

  @Get('projects/:id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: 200, description: 'Returns the project' })
  async findOne(@Param('id') id: string) {
    return this.developerService.findOne(id);
  }

  @Post('projects')
  @ApiOperation({ summary: 'Submit new project' })
  @ApiResponse({ status: 201, description: 'Project submitted' })
  async create(@Body() createProjectDto: any) {
    return this.developerService.create(createProjectDto);
  }

  @Get('projects/:id/refresh')
  @ApiOperation({ summary: 'Refresh GitHub data' })
  @ApiResponse({ status: 200, description: 'GitHub data refreshed' })
  async refreshGitHubData(@Param('id') id: string) {
    return this.developerService.refreshGitHubData(id);
  }

  @Delete('projects/:id')
  @ApiOperation({ summary: 'Delete project' })
  @ApiResponse({ status: 200, description: 'Project deleted' })
  async remove(@Param('id') id: string) {
    return this.developerService.remove(id);
  }
}
