import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SaymotionService } from '../../services/saymotion.service';

@Component({
  selector: 'app-motion-generator',
  templateUrl: './motion-generator.component.html',
  styleUrls: ['./motion-generator.component.css']
})
export class MotionGeneratorComponent {
  form: FormGroup;
  jobId?: string;
  error?: string;
  loading = false;

  constructor(private fb: FormBuilder, private saymotion: SaymotionService) {
    this.form = this.fb.group({ prompt: [''] });
  }

  async submit() {
    const { prompt } = this.form.value;
    if (!prompt) {
      return;
    }
    this.loading = true;
    this.error = undefined;
    this.jobId = undefined;
    try {
      const res = await this.saymotion.generateMotion(prompt);
      this.jobId = res.rid;
    } catch (err) {
      this.error = 'Failed to submit request.';
    } finally {
      this.loading = false;
    }
  }
}
