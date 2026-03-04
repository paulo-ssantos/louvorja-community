import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CollectionsService } from './collections.service';

@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search across all content' })
  @ApiResponse({ status: 200, description: 'Returns search results' })
  async search(@Query('q') query: string) {
    return this.collectionsService.search(query);
  }

  @Get()
  @ApiOperation({ summary: 'Get all collections' })
  @ApiResponse({ status: 200, description: 'Returns all collections' })
  async findAll(
    @Query('category') category?: string,
    @Query('sort') sort: 'recent' | 'popular' = 'recent',
  ) {
    return this.collectionsService.findAll(category, sort);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get collection by ID' })
  @ApiResponse({ status: 200, description: 'Returns the collection' })
  async findOne(@Param('id') id: string) {
    return this.collectionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new collection' })
  @ApiResponse({ status: 201, description: 'Collection created' })
  async create(@Body() createCollectionDto: any) {
    return this.collectionsService.create(createCollectionDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update collection' })
  @ApiResponse({ status: 200, description: 'Collection updated' })
  async update(@Param('id') id: string, @Body() updateCollectionDto: any) {
    return this.collectionsService.update(id, updateCollectionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete collection' })
  @ApiResponse({ status: 200, description: 'Collection deleted' })
  async remove(@Param('id') id: string) {
    return this.collectionsService.remove(id);
  }

  @Post(':id/upvote')
  @ApiOperation({ summary: 'Upvote a collection' })
  @ApiResponse({ status: 200, description: 'Collection upvoted' })
  async upvote(@Param('id') id: string, @Body('userId') userId: string) {
    return this.collectionsService.upvote(id, userId);
  }

  @Post(':id/rate')
  @ApiOperation({ summary: 'Rate a collection' })
  @ApiResponse({ status: 200, description: 'Collection rated' })
  async rate(@Param('id') id: string, @Body() body: { userId: string; rating: number }) {
    return this.collectionsService.rate(id, body.userId, body.rating);
  }

  @Get('top/:category')
  @ApiOperation({ summary: 'Get top 5 collections by category' })
  @ApiResponse({ status: 200, description: 'Returns top 5 collections' })
  async getTopByCategory(@Param('category') category: string) {
    return this.collectionsService.getTopByCategory(category);
  }
}
