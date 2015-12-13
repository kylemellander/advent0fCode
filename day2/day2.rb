paper_needed = 0
ribbon_needed = 0

File.open('packages.txt', 'r') do |f|
  f.each_line do |line|
    arr = line.split("x").map(&:to_i)
    side_a = 2 * arr[0] * arr[1]
    side_b = 2 * arr[1] * arr[2]
    side_c = 2 * arr[2] * arr[0]
    area = [side_a, side_b, side_c]
    # Wrapping Paper
    paper_needed += area.push(area.min / 2).inject(:+)

    # Ribbon to Wrap around package
    ribbon_needed += (arr.inject(:+) - arr.max) * 2

    # Add Bow
    ribbon_needed += (arr.inject(:*))
  end
end

puts "Part 1: #{paper_needed}"
puts "Part 2: #{ribbon_needed}"
