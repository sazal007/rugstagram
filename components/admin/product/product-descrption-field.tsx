'use client';

import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReusableQuill from '@/components/ui/tip-tap'; 
import { ProductFormValues } from '@/schemas/product-form';

interface ProductDescriptionFieldsProps {
  control: Control<ProductFormValues>;
}

export const ProductDescriptionFields: React.FC<ProductDescriptionFieldsProps> = ({ control }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Descriptions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className='mb-2'>Main Description</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <ReusableQuill {...field} minHeight={150} />}
          />
        </div>
        <div>
          <Label className='mb-2'>Highlight Description</Label>
          <Controller
            name="highlight_description"
            control={control}
            render={({ field }) => <ReusableQuill {...field} minHeight={100} toolbar="basic" />}
          />
        </div>
        <div>
          <Label className='mb-2'>Extra Description</Label>
          <Controller
            name="extra_description"
            control={control}
            render={({ field }) => <ReusableQuill {...field} minHeight={100} toolbar="basic" />}
          />
        </div>
        <div>
          <Label className='mb-2'>About This Design</Label>
          <Controller
            name="about_this_design_description"
            control={control}
            render={({ field }) => <ReusableQuill {...field} minHeight={100} toolbar="basic" />}
          />
        </div>
        <div>
          <Label className='mb-2'>Specifications</Label>
          <Controller
            name="specifications"
            control={control}
            render={({ field }) => <ReusableQuill {...field} minHeight={150} toolbar="minimal" />}
          />
        </div>
      </CardContent>
    </Card>
  );
};